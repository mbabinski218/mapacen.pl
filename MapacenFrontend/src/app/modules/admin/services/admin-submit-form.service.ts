import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Injectable()
export class AdminSubmitFormService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  sendForm(form: FormGroup, currentAction: AllAdminActionsType): Observable<any> {
    switch (currentAction) {//średnio zrobione ale nie chce mi sie myśleć nad lepszym sposobem
      case 'AddOffer': {
        return this.addOffer(form);
      }
      case 'ModifyOffer': {
        return this.modifyOffer(form);
      }
    }
  }

  addOffer(form: FormGroup): Observable<number> {
    const price = Number(form.value.price);
    const productId = form.value.product;
    const salesPointId = form.value.salesPoint;

    return this.http.post<number>(`${environment.httpBackend}${Api.OFFERS}`, { price, productId, salesPointId }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error);
        return of();
      }),
    );
  }

  modifyOffer(form: FormGroup): Observable<number> {
    const params = new HttpParams()
      .set('id', form.value.offer)
      .set('price', Number(form.value.price))

    return this.http.put<number>(`${environment.httpBackend}${Api.OFFERS}`, {}, { params }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error);
        return of();
      }),
    );
  }
}
