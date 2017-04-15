import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdSnackBar, MaterialModule } from '@angular/material';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { RoundService } from '../../core/round.service';
import { RoundServiceSpy } from '../../testing/service-spies';
import { RouterStub } from '../../testing/router-stubs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  @Injectable()
  class SnackBarSpy {
    // TODO: some sort of universal spy/fixture
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, NoopAnimationsModule ],
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: MdSnackBar, useClass: SnackBarSpy },
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
