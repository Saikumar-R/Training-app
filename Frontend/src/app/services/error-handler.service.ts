import { Injectable } from "@angular/core";

import { Observable, of, BehaviorSubject  } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlerService {

  isValidCredentials$ = new BehaviorSubject<boolean>(false);

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      // alert(`${error.message}`);
      this.isValidCredentials$.next(true);
      return of(result as T);
    };
  }
}
