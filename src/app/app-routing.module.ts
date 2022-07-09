import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { OnlyLoggedInUsersGuard, OnlyLoggedOutUsersGuard } from './shared/guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [OnlyLoggedOutUsersGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: EmployeeDashboardComponent, canActivate: [OnlyLoggedInUsersGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
