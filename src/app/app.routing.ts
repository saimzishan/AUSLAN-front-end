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

const appRoutes: Routes = [
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]},
  { path: 'user-management/profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  { path: 'booking-management', component: BookingComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/create', component: BookingDetailComponent, canActivate: [AuthGuard]},
  { path: 'booking-management/:id/jobs', component: BookingJobsComponent, canActivate: [AuthGuard]},
  { path: 'authenticate', component: AuthComponent },
  { path: 'authenticate/logout', component: AuthComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'register/step2', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'verify/:id', component: VerifyComponent, canActivate: [AuthGuard]},
  {path: 'bookings', component: BookingComponent},
  { path: '**', redirectTo: 'authenticate', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
