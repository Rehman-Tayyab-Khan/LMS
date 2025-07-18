// src/app/dashboard/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/enviroment';

interface StudentSubmission {
  _id?: string;
  name: string;
  batch: string;
  course: string;
  remarks?: string;
  studentId: string;
  submittedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/teacher/add`, studentData);
  }

  updateStudent(studentId: string, studentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/teacher/update/${studentId}`, studentData);
  }

  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/teacher/delete/${studentId}`);
  }

  getStudentsByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/teacher/all?teacherId=${teacherId}`);
  }
  getStudents(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teacher/students?page=${page}&size=${size}`);
  }
// //////////////////////////////////////////////////////////////////////////////////////////////////
  getByStudentId(studentId: string): Observable<StudentSubmission> {
    return this.http.get<StudentSubmission>(`${this.apiUrl}/student/submission/${studentId}`);
  }

  submit(submissionData: StudentSubmission): Observable<StudentSubmission> {
    return this.http.post<StudentSubmission>(`${this.apiUrl}/student/submit`, submissionData);
  }

  update(submissionId: string, submissionData: StudentSubmission): Observable<StudentSubmission> {
    return this.http.put<StudentSubmission>(`${this.apiUrl}/student/update/${submissionId}`, submissionData);
  }

  delete(submissionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/student/delete/${submissionId}`);
  }

 
}
  