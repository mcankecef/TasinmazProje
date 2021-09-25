import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciListeComponent } from './kullanici-liste.component';

describe('KullaniciListeComponent', () => {
  let component: KullaniciListeComponent;
  let fixture: ComponentFixture<KullaniciListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KullaniciListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KullaniciListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
