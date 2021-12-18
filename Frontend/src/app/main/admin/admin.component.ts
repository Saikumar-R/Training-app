import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { RegisterModel } from 'src/app/models/register-model';

import { AuthService } from 'src/app/services/auth.service';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userDatas$: Observable<RegisterModel[]>;
  userId: Pick<RegisterModel, "id">;
  searchData;
  constructor(private authService: AuthService, private adminDataService: AdminDataService) { }

  ngOnInit(): void {

    this.userDatas$ = this.fetchAll();
    this.userId = this.authService.userId;
  }
  fetchAll(): Observable<RegisterModel[]> {
    return this.adminDataService.fetchAll();
  }

}
