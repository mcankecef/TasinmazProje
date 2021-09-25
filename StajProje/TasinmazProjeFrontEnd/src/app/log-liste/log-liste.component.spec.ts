import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListeComponent } from './log-liste.component';

describe('LogListeComponent', () => {
  let component: LogListeComponent;
  let fixture: ComponentFixture<LogListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
