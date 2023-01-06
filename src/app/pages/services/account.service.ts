import { catchError, Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConst } from '../constants/api-const';
import { SignInRequestDto } from '../models/dtos/requests/sign-in-request-dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  signIn(signInRequestDto: SignInRequestDto): Observable<SignInRequestDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;
    const headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(signInRequestDto.userName + ':' + signInRequestDto.password) 
    })
    return this.http.post<SignInRequestDto>(webApiUrl, signInRequestDto, { headers }).pipe(
      catchError(() => {
        return of(null as unknown as SignInRequestDto);
      })
    )
  }
}
