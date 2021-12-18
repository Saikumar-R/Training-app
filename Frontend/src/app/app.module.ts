import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './main/home/home.component';
import { TrainingsComponent } from './main/trainings/trainings.component';
import { PlacementsComponent } from './main/placements/placements.component';
import { AboutComponent } from './main/about/about.component';
import { AdminComponent } from './main/admin/admin.component';

import { AuthInterceptorService } from "./services/auth-interceptor.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    TrainingsComponent,
    PlacementsComponent,
    AboutComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
