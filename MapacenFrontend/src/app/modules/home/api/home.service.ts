import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '@modules/home/interfaces/home.interface';
import { environment } from '@env/environment';
import { Api } from '@core/enums/api.enum';

@Injectable()
export class HomeService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.httpBackend}${Api.GET_CATEGORIES}`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.httpBackend}${Api.GET_CATEGORY_BY_ID
      .replace(':id', id.toString())}`
    );
  }

  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${environment.httpBackend}${Api.CREATE_CATEGORY}`, { name });
  }
}
