import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciEkleFormComponent } from './kullanici-ekle-form.component';

describe('KullaniciEkleFormComponent', () => {
  let component: KullaniciEkleFormComponent;
  let fixture: ComponentFixture<KullaniciEkleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullaniciEkleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullaniciEkleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
