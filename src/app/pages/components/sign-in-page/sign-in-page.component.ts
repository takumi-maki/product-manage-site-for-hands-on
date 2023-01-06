import { Observable } from 'rxjs';
import { RoutingService } from 'src/app/core/services/routing.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { UrlConst } from '../../constants/url-const';
import { SignInRequestDto } from '../../models/dtos/requests/sign-in-request-dto';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {
  signInUserAccount = new FormControl<string>('', [Validators.required]);
  signInUserPassword = new FormControl<string>('', [Validators.required]);

  signInForm = this.formBuilder.group({
    signInUserAccount: this.signInUserAccount,
    signInUserPassword: this.signInUserPassword,
  })

  constructor(
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routingService: RoutingService
  ) { }
  
  ngOnInit(): void {
    this.setupLanguage();
  }

  clickSignInButton() {
    const signInRequestDto = this.createSignInRequestDto();
    this.signIn(signInRequestDto);
  }

  private setupLanguage() {
    this.translateService.setDefaultLang(this.getLanguage(navigator.language));
    this.translateService.use(this.getLanguage(navigator.language));
  }
  private getLanguage(language: string): string {
    const CHAR_HYPHEN = '-';
    if (language.indexOf(CHAR_HYPHEN) > 0) {
      const splittedLanguage: string[] = language.split(CHAR_HYPHEN);
      return splittedLanguage[0];
    }
    return language;
  }


  private createSignInRequestDto(): SignInRequestDto {
    return {
      userName: this.signInUserAccount.value!,
      password: this.signInUserPassword.value!
    }
  }

  signIn(signInRequestDto: SignInRequestDto) {
    const signInRequest: Observable<SignInRequestDto> = this.accountService.signIn(signInRequestDto);
    signInRequest.subscribe((requestDto) => {
      if (requestDto != null) {
        this.routingService.navigate(UrlConst.PATH_PRODUCT_LISTING)
      }
    })
  }

  
}
