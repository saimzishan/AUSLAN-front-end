import { NgModule }     from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';
import { NotFoundComponent }   from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';



const appRoutes: Routes = [
  { path: 'admin-center', component: AdminComponent },
  { path: 'user/:id',      component: AuthComponent },
  { path: '**', component: NotFoundComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
];

export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],

})
export class AppRoutingModule {}
