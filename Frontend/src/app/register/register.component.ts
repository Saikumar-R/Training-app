import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { RegisterModel } from '../models/register-model';

import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  // registerModel = new RegisterModel("","","","","","","");
  registerModel : any = {"name": '',"email":'',"number": "","password": '', "collegename":'', "collegeaddress":''}

  ngOnInit(): void {
  }

  registerUser(){
    // console.log(this.registerModel);
    this.authService.signup(this.registerModel).subscribe((msg) => {
      console.log(msg);
     alert("User registration Successful! Click Ok to Login");
     this.router.navigate(["main/home"]);
     
    });
  }

}
