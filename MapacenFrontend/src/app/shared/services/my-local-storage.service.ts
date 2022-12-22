import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Token, TokenContent } from '@modules/top-menu/interfaces/top-menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MyLocalStorageService {

  setStorage(token: Token) {
    localStorage.setItem('userToken', token.tokenContent);

    const tokenData = jwt_decode(token.tokenContent) as TokenContent;
    localStorage.setItem('userName', tokenData.name);
    localStorage.setItem('userEmail', tokenData.email);
    localStorage.setItem('userRole', tokenData.role);
    localStorage.setItem('userCountyId', tokenData.countyId);
    localStorage.setItem('userId', tokenData.userId);
    localStorage.setItem('userCommenting', tokenData.canComment);
  }

  removeStorage() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userCountyId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userCommenting');
  }

  getRole(): string {
    return localStorage.getItem('userRole');
  }
}
