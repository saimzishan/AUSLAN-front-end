import {
    RouterModule, Routes,
} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './auth/auth.guard';
import {UserManagementComponent} from './user-management/user-management.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthComponent} from './auth/auth.component';
import {ModuleWithProviders} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {ResetComponent} from './reset/reset.component';
import {VerifyComponent} from './verify/verify.component';
import {BookingComponent} from './booking-management/booking.component';
import {BookingDetailComponent} from './booking-management/booking-detail/booking-detail.component';
import {UserProfileComponent} from './user-management/user-profile/user-profile.component';
import {BookingJobsComponent} from './booking-management/booking-jobs/booking-jobs.component';
import {NoAuthGuard} from './auth/no-auth.guard';
import {OrgRepComponent} from './ui/org-rep/org-rep.component';
import {SkillMatrixComponent} from './user-management/skill-matrix/skill-matrix.component';
import {InterpreterComponent} from './ui/interpreter/interpreter.component';
import {UserPasswordComponent} from './user-management/user-password/user-password.component';
import {PreComponent} from './register/pre/pre.component';
import {BlockoutComponent} from './user-management/user-profile/blockout/blockout.component';
import {BookingPayrollComponent} from './booking-management/booking-payroll/booking-payroll.component';
import {UserPayrollBillingComponent} from './user-management/user-payroll-billing/user-payroll-billing.component';
import {InboxComponent} from './messaging/inbox/inbox.component';
import {StaffCalendarComponent} from './user-management/staff-calendar/staff-calendar.component';
import {ReportsComponent} from './reports/reports.component';
import {VerifiedGuard} from './auth/verified.guard';

const appRoutes: Routes = [
    {path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'user-management/profile', component: UserProfileComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'user-management/secure_pass', component: UserPasswordComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'user-management/:id/skills', component: SkillMatrixComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'user-management/:id/block_out', component: BlockoutComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'user-management/:id/staff-availability', component: BlockoutComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'user-management/:id/staff_calendar', component: StaffCalendarComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'user-management/payroll-billing', component: UserPayrollBillingComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'booking-management', component: BookingComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'booking-management/:id/create-booking', component: BookingDetailComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'booking-management/create-booking', component: BookingDetailComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'booking-management/:id/booking-job', component: BookingJobsComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'booking-management/:id/job-detail', component: BookingJobsComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'booking-management/edit-booking', component: BookingDetailComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'booking-management/:id/payroll-billing', component: BookingPayrollComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'users/:id/inbox', component: InboxComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'users/:id/inbox/:id2', component: InboxComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'authenticate', component: AuthComponent, canActivate: [NoAuthGuard]},
    {path: 'authenticate/logout', component: AuthComponent},
    {path: '404', component: NotFoundComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'register/pre', component: PreComponent, canActivate: [NoAuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
    {path: 'init', component: RegisterComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: 'reset', component: ResetComponent, canActivate: [NoAuthGuard]},
    {path: 'verify/:id', component: VerifyComponent, canActivate: [AuthGuard]},
    {path: 'bookings', component: BookingComponent, canActivate: [AuthGuard, VerifiedGuard]},
    {path: '**', redirectTo: 'authenticate', pathMatch: 'full', canActivate: [NoAuthGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
