import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import localeJa from '@angular/common/locales/ja';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/.core-fWz43rwF';
import { TranslateHttpLoader } from '@ngx-translate/.http-loader-yGudunX5';

registerLocaleData(localeDe);
registerLocaleData(localeFr);
registerLocaleData(localeJa);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateHttpLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule]
  
})
  

export class NgxTranslateModule { }
