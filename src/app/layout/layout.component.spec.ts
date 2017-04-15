import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { LayoutComponent } from './layout.component';
import { RoundService } from '../core/round.service';
import { RouterStub } from '../testing/router-stubs';
import { RoundServiceSpy } from '../testing/service-spies';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [ LayoutComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
