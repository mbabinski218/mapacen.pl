import { Api } from '@core/enums/api.enum';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MainOffer, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { idNameOnly, UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminStorageService {

  constructor(
    private http: HttpClient,
  ) { }

  salePointsFixedNames: string[] = [];
  salePoints: SalesPoint[] = [];
  counties: idNameOnly[] = [];
  categories: idNameOnly[] = [];
  products: Product[] = [];
  users: UserInfo[] = [];
  offers: MainOffer;

  getAll(): void {
    this.getSalePoints(Number(localStorage.getItem('userProfileCountyId'))).subscribe((res) => {
      this.salePoints = res;
    });

    this.getAllCounties().subscribe((res) => {
      this.counties = res ? res : null;
    });

    this.getAllCategories().subscribe((res) => {
      this.categories = res ? res : null;
    });

    this.getAllProducts().subscribe((res) => {
      this.products = res ? res : null;
    });

    this.getAllUsers().subscribe((res) => {
      this.users = res ? res : null;
    });

    this.getAllOffers().subscribe((res) => {
      this.offers = res ? res : null;
    });
  }

  getSalePoints(countyId: number): Observable<SalesPoint[]> {
    return this.http.get<SalesPoint[]>(`${environment.httpBackend}${Api.SALE_POINT}`
      .replace(':countyId', countyId.toString()))
      .pipe(
        catchError(() => {
          return of([]);
        }),
      );
  }

  getAllCounties(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.COUNTIES}`).pipe(
      catchError(() => {
        return of([]);
      }),
    );
  }

  getAllCategories(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.CATEGORIES}`).pipe(
      catchError(() => {
        return of([]);
      }),
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.httpBackend}${Api.PRODUCTS}`).pipe(
      catchError(() => {
        return of([]);
      }),
    );
  }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${environment.httpBackend}${Api.USERS}`).pipe(
      catchError(() => {
        return of([]);
      }),
    );
  }

  getAllOffers(): Observable<MainOffer> {
    const params = new HttpParams()
      .set('countyId', localStorage.getItem('userProfileCountyId'))

    return this.http.get<MainOffer>(`${environment.httpBackend}${Api.OFFERS}`, { params }).pipe(
      catchError(() => {
        return of();
      }),
    );
  }
}