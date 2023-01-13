import { Api } from '@core/enums/api.enum';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';
import { idNameOnly, UserInfo } from '@modules/top-menu/interfaces/top-menu.interface';
import { MainOffer, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { DropDownText } from '@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminStorageService {

  constructor(
    private http: HttpClient,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  salesPoints: SalesPoint[] = [];
  counties: idNameOnly[] = [];
  categories: idNameOnly[] = [];
  products: Product[] = [];
  users: UserInfo[] = [];
  offers: MainOffer;
  currentAction: AllAdminActionsType;
  isServiceAdmin: boolean;

  onInit(): void {
    this.isServiceAdmin = this.myLocalStorageService.isServiceAdmin();

    this.refreshOffers();

    this.refreshSalesPoints();

    this.refreshCategories();

    this.refreshProducts();

    this.getAllCounties().subscribe((res) => {
      this.counties = res ? res : null;
    });

    this.getAllUsers().subscribe((res) => {
      this.users = res ? res : null;
    });
  }

  refreshOffers(): void {
    this.getAllOffers().subscribe((res) => {
      this.offers = res ? res : null;
    });
  }

  refreshProducts(): void {
    this.getAllProducts().subscribe((res) => {
      this.products = res ? res : null;
    });
  }

  refreshCategories(): void {
    this.getAllCategories().subscribe((res) => {
      this.categories = res ? res : null;
    });
  }

  refreshSalesPoints(): void {
    this.getSalesPoints().subscribe((res) => {
      this.salesPoints = res ? res : null;
    });
  }

  getSalesPoints(): Observable<SalesPoint[]> {
    // if (this.isServiceAdmin) {
    //strzal po wszystkie salespointy bez countyid
    // } else {
    const countyId = localStorage.getItem('userProfileCountyId');
    return this.http.get<SalesPoint[]>(`${environment.httpBackend}${Api.SALES_POINT}`
      .replace(':countyId', countyId))
      .pipe(
        catchError(() => {
          return of([]);
        }),
      );
    // }
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
    // if (this.isServiceAdmin) {
    //strzal po wszystkie salespointy bez countyid
    // } else {
    const params = new HttpParams()
      .set('countyId', Number(localStorage.getItem('userProfileCountyId')));

    return this.http.get<MainOffer>(`${environment.httpBackend}${Api.OFFERS}`, { params }).pipe(
      catchError(() => {
        return of();
      }),
    );
    // }
  }

  deleteData(id: number, deleteApi: string): Observable<any> {
    return this.http.delete<any>(`${environment.httpBackend}${deleteApi}`.replace(':id', id.toString()))
      .pipe(
        catchError(() => {
          return of();
        }),
      );
  }

  getDataForTable(operationText: DropDownText): unknown {
    if (operationText === 'Oferta') {
      return this.offers.offers;
    }
    else if (operationText === 'Użytkownik') {
      return this.users;
    }
    else if (operationText === 'Kategoria') {
      return this.categories;
    }
    else if (operationText === 'Produkt') {
      return this.products;
    }
    else if (operationText === 'Punkt sprzedaży') {
      return this.salesPoints;
    }
    return;
  }
}