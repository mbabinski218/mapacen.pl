import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import { Api } from '@core/enums/api.enum';
import { idNameOnly, Login, Register } from '../interfaces/top-menu.interface';

@Injectable()
export class TopMenuService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCounties(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.GET_COUNTY}`).pipe(
      catchError(() => of([])),//w catcherrorze toast ze cos poszlo nie tak
    );
  }

  getAllCategories(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.GET_CATEGORIES}`).pipe(
      catchError(() => of([])),//w catcherrorze toast ze cos poszlo nie tak
    );
  }

  loginUser({ email, password }: Login): Observable<string> {
    console.log(email)
    console.log(password)
    return this.http.post<string>(`${environment.httpBackend}${Api.LOGIN_USER}`, { email, password }).pipe(
      catchError(() => of()),//w catcherrorze toast ze cos poszlo nie tak
    );
  }

  registerUser({ name, email, password, confirmedPassword, countyId }: Register): Observable<string> {
    return this.http.post<string>(`${environment.httpBackend}${Api.REGISTER_USER}`, { name, email, password, confirmedPassword, countyId }).pipe(
      catchError(() => of()),//w catcherrorze toast ze cos poszlo nie tak
    );
  }
}