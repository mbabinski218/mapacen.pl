import { Injectable } from '@angular/core';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Offer, Offers } from '@modules/offers/interfaces/offers.interface';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Injectable()
export class OffersService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getAllOffers(countyId: number, search: string, categoryId: number, page: number, pageSize: number): Observable<Offer> {
    const params = new HttpParams()
      .set('countyId', countyId)
      .set('productName', search ? search : '')
      .set('categoryId', categoryId ? categoryId : '')
      .set('pageSize', pageSize)
      .set('pageNumber', page)

    return this.http.get<Offer>(`${environment.httpBackend}${Api.OFFERS}`, { params }).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError("Błąd pobierania ofert");
        return of();
      }),
    );
  }

  getFavourites(favouritesId: number, page: number, pageSize: number): Observable<Offer> {
    const params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', page)

    return this.http.get<Offer>(`${environment.httpBackend}${Api.FAVOURITES_UPDATE}`
      .replace(':favouritesId', favouritesId.toString()), { params })
      .pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError("Błąd pobierania ulubionych");
          return of();
        }),
      );
  }

  updateFavourites(favouritesId: number, offerId: number): Observable<any> {
    const params = new HttpParams()
      .set('favouritesId', favouritesId)
      .set('offerId', offerId)

    return this.http.post<any>(`${environment.httpBackend}${Api.FAVOURITES}`, { params }).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError("Błąd aktualizacji ulubionych");
        return of();
      }),
    );
  }
}
