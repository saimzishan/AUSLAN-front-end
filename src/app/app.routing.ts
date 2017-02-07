import { NgModule }     from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';
import { NotFoundComponent }   from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { ModuleWithProviders }  from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyComponent } from './verify/verify.component';



const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/authenticate',
    pathMatch: 'full'
  },
  { path: 'admin-center', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'authenticate', component: AuthComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'verify', component: VerifyComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
