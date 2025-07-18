import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  studentForm: FormGroup;
  students: any[] = [];
  editIndex: number | null = null;

  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  teacherId = localStorage.getItem('userId'); 

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
   
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      batch: ['', Validators.required],
      course: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadStudents();
  }

  get f() {
    return this.studentForm.controls;
  }

  onSubmit() {
    if (this.studentForm.invalid) return;

    const studentData = {
      ...this.studentForm.value,
      enrolledBy: this.teacherId 
    };

    if (this.editIndex === null) {
      this.studentService.addStudent(studentData).subscribe({
        next: (res) => {
          this.studentForm.reset();
          this.loadStudents();
        },
        error: (err) => {
          console.error('Error adding student:', err);
        }
      });
    } else {
      const studentId = this.students[this.editIndex]._id;
      this.studentService.updateStudent(studentId, studentData).subscribe({
        next: () => {
          this.editIndex = null;
          this.studentForm.reset();
          this.loadStudents();
        },
        error: (err) => {
          console.error('Error updating student:', err);
        }
      });
    }
  }

  onEdit(index: number): void {
    this.studentForm.patchValue(this.students[index]);
    this.editIndex = index;
  }

  onDelete(index: number): void {
    const studentId = this.students[index]._id;
    this.studentService.deleteStudent(studentId).subscribe({
      next: () => {
        this.loadStudents();
      },
      error: (err) => {
        console.error('Error deleting student:', err);
      }
    });
  }

  loadStudents() {
    this.studentService.getStudents(this.currentPage, this.pageSize).subscribe(res => {
      this.students = res.data;
      this.totalItems = res.total;
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadStudents();
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/home';
  }
  totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
