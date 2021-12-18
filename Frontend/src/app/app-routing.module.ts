import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./services/auth-guard.service";

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AboutComponent } from './main/about/about.component';
import { AdminComponent } from './main/admin/admin.component';
import { HomeComponent } from './main/home/home.component';
import { MainComponent } from './main/main.component';
import { PlacementsComponent } from './main/placements/placements.component';
import { TrainingsComponent } from './main/trainings/trainings.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'', redirectTo:'/main/home', pathMatch:'full', },
  { path:'main',component:MainComponent,
        children:[
          {path:'home', component:HomeComponent},
          {path:'trainings', component:TrainingsComponent},
          {path:'placements', component:PlacementsComponent},
          {path:'about', component:AboutComponent},
          {path:'admin', component:AdminComponent, canActivate: [AuthGuard]}
        
        ]
  },
  { path:'register',component:RegisterComponent },
  { path:'forgot-password', component:ForgotPasswordComponent },
  { path: "**", redirectTo: "/main/home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
