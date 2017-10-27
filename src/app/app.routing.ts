import {
  RouterModule, Routes,
} from '@angular/router';
import { NotFoundComponent }   from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { ModuleWithProviders }  from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyComponent } from './verify/verify.component';
import {BookingComponent} from './booking-management/booking.component';
import {BookingDetailComponent} from './booking-management/booking-detail/booking-detail.component';
import {UserProfileComponent} from './user-management/user-profile/user-profile.component';
import {BookingJobsComponent} from './booking-management/booking-jobs/booking-jobs.component';
import { NoAuthGuard } from './auth/no-auth.guard';
import {JobDetailComponent} from './booking-management/booking-jobs/job-detail/job-detail.component';
import {OrgRepComponent} from './ui/org-rep/org-rep.component';
import {SkillMatrixComponent} from './user-management/skill-matrix/skill-matrix.component';
import { InterpreterComponent } from './ui/interpreter/interpreter.component';
import {UserPasswordComponent} from './user-management/user-password/user-password.component';
import {PreComponent} from './register/pre/pre.component';
import {BlockoutComponent} from './user-management/user-profile/blockout/blockout.component';

const appRoutes: Routes = [
  { path: 'demo', component: OrgRepComponent },
  { path: 'demo-interpreter', component: InterpreterComponent },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]},
  { path: 'user-management/profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'user-management/secure_pass', component: UserPasswordComponent, canActivate: [AuthGuard]},
  { path: 'user-management/:id/skills', component: SkillMatrixComponent, canActivate: [AuthGuard]},
  { path: 'user-management/:id/block_out', component: BlockoutComponent, canActivate: [AuthGuard]},
  { path: 'booking-management', component: BookingComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/:id/create-booking', component: BookingDetailComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/create-booking', component: BookingDetailComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/:id/booking-job', component: BookingJobsComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/:id/job-detail', component: BookingJobsComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/edit-booking', component: BookingDetailComponent, canActivate: [AuthGuard]},
  { path: 'authenticate', component: AuthComponent , canActivate: [NoAuthGuard] },
  { path: 'authenticate/logout', component: AuthComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'register/pre', component: PreComponent, canActivate: [NoAuthGuard] },
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  {path: 'reset', component: ResetComponent, canActivate: [NoAuthGuard] },
  {path: 'verify/:id', component: VerifyComponent, canActivate: [AuthGuard]},
  {path: 'bookings', component: BookingComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'authenticate', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
