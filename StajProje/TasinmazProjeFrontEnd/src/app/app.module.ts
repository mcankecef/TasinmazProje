import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { KullaniciEkleFormComponent } from './kullanici-ekle-form/kullanici-ekle-form.component';
import { KullaniciListeComponent } from './kullanici-liste/kullanici-liste.component';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { appRoutes } from './routes';
import { TasinmazListeComponent } from './tasinmaz-liste/tasinmaz-liste.component';
import { LogListeComponent } from './log-liste/log-liste.component';
import { LogFilterPipe } from './log-liste/log-filter.pipe';
import { NgxPaginationModule, PaginationControlsComponent } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import * as XLSX from 'xlsx';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    KullaniciEkleFormComponent,
    KullaniciListeComponent,
    TasinmazListeComponent,
    LogListeComponent,
    LogFilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
