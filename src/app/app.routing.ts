import { NgModule }     from '@angular/core';
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
import {BookingComponent} from './booking/booking.component';


const appRoutes: Routes = [
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard]},
  { path: 'authenticate', component: AuthComponent },
  { path: 'authenticate/logout', component: AuthComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'register/step2', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'verify/:id', component: VerifyComponent},
  {path: 'bookings', component: BookingComponent},
  { path: '**', redirectTo: 'authenticate', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
