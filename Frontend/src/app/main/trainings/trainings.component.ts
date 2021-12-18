import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import { from } from 'rxjs';
import { CourseDetailsService } from '../../services/inAppServices/trainings/course-details.service';

declare var $: any;

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  panelOpenState = false;
  public courseDetails = [];

  constructor(private _courseDetailsService: CourseDetailsService) { }

  ngOnInit(): void {
    this._courseDetailsService.getCourseDetails()
      .subscribe(data => this.courseDetails = data);
  }

  expandCollapse(){
    if($('#expandCollapse').text() === "Expand All"){
      $('#expandCollapse').text('Collapse All');
      $('.mat-expansion-panel-content').css({"height":"auto","visibility":"visible"});
      $('.mat-expansion-panel .mat-expansion-panel-header .mat-expansion-indicator').css({"transform": "rotate(180deg)"});
    }
    else{
      $('#expandCollapse').text('Expand All');
      $('.mat-expansion-panel-content').css({"height":"0","visibility":"hidden"});
      $('.mat-expansion-panel .mat-expansion-panel-header .mat-expansion-indicator').css({"transform": "rotate(0deg)"});
    }
  }
}