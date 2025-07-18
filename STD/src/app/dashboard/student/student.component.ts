import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';

interface StudentSubmission {
  _id?: string;
  name: string;
  batch: string;
  course: string;
  remarks?: string;
  studentId: string;
  submittedAt?: Date;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  submissionForm: FormGroup;
  currentSubmission: StudentSubmission | null = null;
  isEditing = false;

  constructor(
    private fb: FormBuilder, 
    private studentService: StudentService
  ) {
    this.submissionForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      batch: ['', Validators.required],
      course: ['', Validators.required],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    const studentName = localStorage.getItem('userName');
    const studentId = localStorage.getItem('userId');
    
    this.submissionForm.patchValue({ name: studentName });

    if (studentId) {
      this.loadExistingSubmission(studentId);
    }
  }

  private loadExistingSubmission(studentId: string): void {
    this.studentService.getByStudentId(studentId).subscribe({
      next: (submission: StudentSubmission) => {
        if (submission) {
          this.currentSubmission = submission;
          this.submissionForm.patchValue(submission);
        }
      },
      error: () => {
        console.log('No existing submission found');
      }
    });
  }

  get f() {
    return this.submissionForm.controls;
  }

  onSubmit(): void {
    if (this.submissionForm.invalid) return;

    const studentId = localStorage.getItem('userId');
    const formData = {
      ...this.submissionForm.getRawValue(),
      studentId: studentId
    };

    if (this.currentSubmission?._id) {
      // Update existing submission
      this.studentService.update(this.currentSubmission._id, formData).subscribe({
        next: () => {
          alert('Submission updated successfully!');
          this.isEditing = false;
        }
      });
    } else {
      // Create new submission
      this.studentService.submit(formData).subscribe({
        next: (newSubmission: StudentSubmission) => {
          this.currentSubmission = newSubmission;
          alert('Submission created successfully!');
          this.isEditing = false;
        }
      });
    }
  }

  onEdit(): void {
    this.submissionForm.enable();
    this.isEditing = true;
  }

  onDelete(): void {
    if (!this.currentSubmission?._id) return;

    this.studentService.delete(this.currentSubmission._id).subscribe({
      next: () => {
        this.currentSubmission = null;
        this.submissionForm.reset({ name: localStorage.getItem('userName') });
        this.isEditing = false;
        alert('Submission deleted successfully!');
      }
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/home';
  }
}
