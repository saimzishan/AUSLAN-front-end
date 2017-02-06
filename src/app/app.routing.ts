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



const appRoutes: Routes = [
  { path: 'admin-center', component: AdminComponent },
  { path: 'authenticate', component: AuthComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
