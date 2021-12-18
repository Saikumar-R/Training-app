import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CourseDetails } from '../../../models/inAppModels/trainings/course-details';

@Injectable({
  providedIn: 'root'
})
export class CourseDetailsService {

    private _url:string = "/assets/serverSideJsonFiles/Trainings/courseDetails.json";

  constructor(private http:HttpClient) { }

    getCourseDetails():Observable<CourseDetails[]>{
      return this.http.get<CourseDetails[]>(this._url);
    }
}
