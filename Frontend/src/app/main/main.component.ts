import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

import { AuthService } from "src/app/services/auth.service";
import { ErrorHandlerService } from "src/app/services/error-handler.service";

import { LoginUserModel } from '../models/login-user-model';
import { RegisterModel } from '../models/register-model';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  isAuthenticated = false;
  isAdmin = false;
  checkCredentials = false;
  // user$: Observable<LoginUserModel[]>;
  public userName="";

  @ViewChild('closebutton') closebutton;

  constructor(private authService: AuthService, private router: Router, private errorService: ErrorHandlerService) {  }
  
  // loginUserModel = new LoginUserModel("","","",true);
  loginUserModel : any = {"email": '', "password": ''}

  
  ngOnInit(): void {

    /*Checking whether User is logged in or not*/

    this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
      // console.log(isLoggedIn);
     
    });
  
    /*Getting Loggedin UserName into screen*/

   this.authService.getLoggedInUserName$.subscribe((getUserName)=>{
     this.userName = getUserName;
   });

   /*Checking whether user is Admin or not based on registered email id*/

   this.authService.isAdminUser$.subscribe((checkAdmin)=>{
    this.isAdmin = checkAdmin;
    // console.log(checkAdmin);
  }); 

  this.errorService.isValidCredentials$.subscribe((checkingIdAndPw)=>{
    this.checkCredentials = checkingIdAndPw;
  })

 }

  loginUser(): void {
    this.authService
      .login(this.loginUserModel.email, this.loginUserModel.password)
      .subscribe();

      this.authService.isUserLoggedIn$.subscribe((isLoggedIn) => {
        // this.isAuthenticated = isLoggedIn;
        if(this.isAuthenticated = isLoggedIn){
          this.closebutton.nativeElement.click();
        }
      });
     
   }

  logout(): void {
    alert("Logged out successfully !");
    sessionStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    window.location.reload();
    this.router.navigate(["main/home"]); 
  }
}
