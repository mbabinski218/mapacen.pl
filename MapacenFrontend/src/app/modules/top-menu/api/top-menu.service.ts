import { Category } from './../../showoff/interfaces/showoff.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { Api } from '@core/enums/api.enum';
import { County } from '../interfaces/showoff.interface';

@Injectable()
export class TopMenuService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCounties(): Observable<County[]> {
    return this.http.get<County[]>(`${environment.httpBackend}${Api.GET_COUNTY}`).pipe(
      catchError(() => of([])),
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.httpBackend}${Api.GET_CATEGORIES}`).pipe(
      catchError(() => of([])),
    );
  }

  loginUser() {
    
  }

  registerUser() {

  }
}
