import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KullaniciService } from '../kullanici.service';
import { Kullanici, LoginModel } from '../Model';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginModel : LoginModel = new LoginModel();
  login !: FormGroup;
  kullaniciModel : Kullanici = new Kullanici();
  kullaniciLogin :Kullanici[];


  constructor(private loginService :LoginService,private formBuilder:FormBuilder,private router:Router
    ,private alertifyService:AlertifyService) { }

  ngOnInit() {
    this.login = this.formBuilder.group({
      email : [''],
      sifre : ['']

    });
  }
  postLogin(){
    const val = this.login.value;


    if (val.email && val.sifre) {
      this.loginService.login(val.email , val.sifre)
          .subscribe(
              response => {
                this.alertifyService.success("Başarıyla giriş yapıldı.");
                  localStorage.setItem('rol',String(response.rol));
                  this.router.navigateByUrl('/tasinmaz-liste');
              },
              error =>{
                this.alertifyService.error("E-mail veya şifreniz yanlış.Tekrar deneyiniz.")
              });
  }
  }
}
