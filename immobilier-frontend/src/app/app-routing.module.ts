import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EstimateComponent } from './pages/estimate/estimate.component';
import { HomeComponent } from './pages/home/home.component';
import { ChercherComponent } from './pages/chercher/chercher.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'chercher',
    component: ChercherComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'renovation',
  //   component: EstimateComponent,
  //   pathMatch: 'full',
  // }
  {
    path: 'estimation-immobiliere',
    component: EstimateComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
