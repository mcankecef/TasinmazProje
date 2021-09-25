import { Routes } from "@angular/router";
import { KullaniciListeComponent } from './kullanici-liste/kullanici-liste.component';
import { TasinmazListeComponent } from './tasinmaz-liste/tasinmaz-liste.component';
import { LogListeComponent } from './log-liste/log-liste.component';
import { LoginComponent } from './login/login.component';

export const appRoutes : Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path : 'kullanici-liste' , component:KullaniciListeComponent},
  {path:'tasinmaz-liste' , component:TasinmazListeComponent},
  {path:'log-liste', component:LogListeComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
]
