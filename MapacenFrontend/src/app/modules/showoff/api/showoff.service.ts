import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Category } from '@modules/showoff/interfaces/showoff.interface';
import { environment } from '@env/environment';
import { Api } from '@core/enums/api.enum';

@Injectable()
export class ShowoffService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.httpBackend}${Api.GET_CATEGORIES}`).pipe(
      catchError(() => of([])),
    );
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.httpBackend}${Api.GET_CATEGORY_BY_ID
      .replace(':id', id.toString())}`
    ).pipe(
      catchError(() => of()),
    );
  }

  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${environment.httpBackend}${Api.CREATE_CATEGORY}`, { name }).pipe(
      catchError(() => of()),
    );
  }

  getProduct(name: string, id: number): Observable<Category> {
    const userParams = new HttpParams().set('id', id).set('name', name);
    return this.http.get<Category>(`${environment.httpBackend}${Api.GET_PRODUCT_BY_ID}`, { params: userParams }).pipe(
      catchError(() => of()),
    );
  }

  createProduct(name: string, categoryId: number): Observable<Category> {
    return this.http.post<Category>(`${environment.httpBackend}${Api.CREATE_PRODUCT}`, { name, categoryId }).pipe(
      catchError(() => of()),
    );
  }
}
