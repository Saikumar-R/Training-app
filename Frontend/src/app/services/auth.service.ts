import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { RegisterModel } from "../models/register-model";
import { LoginUserModel } from "../models/login-user-model";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isinvalidCredentials$ = new BehaviorSubject<boolean>(true);
  isAdminUser$ = new BehaviorSubject<boolean>(false);
  userId: Pick<RegisterModel, "id">;
  name: any;
  email: any;
  getLoggedInUserName$ = new BehaviorSubject<string>("");

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<RegisterModel, "id">): Observable<RegisterModel> {
    return this.http
      .post<RegisterModel>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<RegisterModel>("signup"))
      );
  }

  login(
    email: Pick<LoginUserModel, "email">,
    password: Pick<LoginUserModel, "password">
  ): Observable<{
    token: string;
    userId: Pick<RegisterModel, "id">;
    name: any;
    email:any;
  }> {
    return this.http
      .post(`${this.url}/login`, {email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: { token: string; userId: Pick<RegisterModel, "id">; name: Pick<RegisterModel, 'name'>; email:Pick<RegisterModel,'email'>; }) => {

          this.userId = tokenObject.userId;
          this.name = tokenObject.name;
          this.email = tokenObject.email;
          sessionStorage.setItem("token", tokenObject.token);
          this.isUserLoggedIn$.next(true);
          // console.log(sessionStorage.getItem.length);
          this.getLoggedInUserName$.next(this.name.charAt(0).toUpperCase() + this.name.slice(1));
          // console.log(this.name);
          // console.log(this.email);
          if(this.email === "alwayscharan@gmail.com"){
            this.isAdminUser$.next(true);
          }else{
            this.isAdminUser$.next(false);
          }
          this.router.navigate([""]);
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<RegisterModel, "id">;
            name: Pick<RegisterModel, 'name'>;
            email: Pick<RegisterModel, 'email'>;
          }>
          ("login")
        )
        
      );
  }
  
}
