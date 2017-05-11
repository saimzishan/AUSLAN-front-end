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

const appRoutes: Routes = [
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]},
  { path: 'user-management/profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'booking-management', component: BookingComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/create-booking', component: BookingDetailComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/:id/booking-job', component: BookingJobsComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/:id/job-detail', component: JobDetailComponent},
  { path: 'authenticate', component: AuthComponent , canActivate: [NoAuthGuard] },
  { path: 'authenticate/logout', component: AuthComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  {path: 'register/step2', component: RegisterComponent, canActivate: [NoAuthGuard] },
  {path: 'reset', component: ResetComponent, canActivate: [NoAuthGuard] },
  {path: 'verify/:id', component: VerifyComponent, canActivate: [AuthGuard]},
  {path: 'bookings', component: BookingComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'authenticate', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
