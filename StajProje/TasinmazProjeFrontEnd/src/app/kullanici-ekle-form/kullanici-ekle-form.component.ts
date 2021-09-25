import { Component, Input, OnInit } from '@angular/core';
import { KullaniciService } from '../kullanici.service';

@Component({
  selector: 'app-kullanici-ekle-form',
  templateUrl: './kullanici-ekle-form.component.html',
  styleUrls: ['./kullanici-ekle-form.component.css']
})
export class KullaniciEkleFormComponent implements OnInit {


  constructor(private KullaniciService : KullaniciService) { }

  ngOnInit() {
  }

}

