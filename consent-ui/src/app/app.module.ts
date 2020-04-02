import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BASE_PATH } from './api';
import { environment } from '../environments/environment';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, NgHttpLoaderModule.forRoot(), AppRoutingModule],
  providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }],
  bootstrap: [AppComponent]
})
export class AppModule {}
