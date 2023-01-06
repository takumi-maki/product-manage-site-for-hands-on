import { catchError, Observable, of } from 'rxjs';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConst } from '../constants/api-const';
import { AppConst } from '../constants/app-const';
import { SignInRequestDto } from '../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../models/dtos/responses/sign-in-response-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  signIn(signInRequestDto: SignInRequestDto): Observable<SignInResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(signInRequestDto.userName + ':' + signInRequestDto.password) 
    })
    return this.http.post<SignInResponseDto>(webApiUrl, signInRequestDto, { headers }).pipe(
      catchError(() => {
        return of(null as unknown as SignInResponseDto);
      })
    )
  }

  getUser(): User {
    return SessionStorageService.getItem(AppConst.STORAGE_KEY_USER, new User());
  }

  setUser(user: User): void {
    SessionStorageService.setItem(AppConst.STORAGE_KEY_USER, user);
  }

  removeUser(): void {
    SessionStorageService.removeItem(AppConst.STORAGE_KEY_USER);
  }
}
