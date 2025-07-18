import { NgModule } from '@angular/core';
import { HomeComponent } from './PAGES/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { TeacherComponent } from './dashboard/teacher/teacher.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './dashboard/student/student.component';
import { AuthGuard } from './Gard/auth.guard';
import { NoAuthGuard } from './Gard/no-auth.guard'; 

const routes: Routes = [
  { path: '',component:HomeComponent  },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: SigninComponent, canActivate: [NoAuthGuard] },
  { path: 'teacher', component: TeacherComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
  {path: '**',component: SignupComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
