import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { RegisterModel } from "../models/register-model";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  private url = "http://localhost:3000/userData";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchAll(): Observable<RegisterModel[]> {
    return this.http
      .get<RegisterModel[]>(this.url, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<RegisterModel[]>("fetchAll", []))
      );
     
  }

}
