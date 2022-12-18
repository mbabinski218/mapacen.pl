import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { Api } from '@core/enums/api.enum';
import { idNameOnly } from '../interfaces/top-menu.interface';

@Injectable()
export class TopMenuService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCounties(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.GET_COUNTY}`).pipe(
      catchError(() => of([])),
    );
  }

  getAllCategories(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.GET_CATEGORIES}`).pipe(
      catchError(() => of([])),
    );
  }

  loginUser() {

  }

  registerUser() {

  }
}
