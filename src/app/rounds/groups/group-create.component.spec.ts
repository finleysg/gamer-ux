import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { GroupCreateComponent } from './group-create.component';
import { RouterStub, ActivatedRouteStub } from '../../testing/router-stubs';
import { RoundServiceSpy } from '../../testing/service-spies';
import { RoundService } from '../../core/round.service';
import { GroupService } from '../../core/group.service';

describe('GroupCreateComponent', () => {
  let component: GroupCreateComponent;
  let fixture: ComponentFixture<GroupCreateComponent>;

  @Injectable()
  class GroupServiceSpy {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, NoopAnimationsModule ],
      providers: [
        { provide: RoundService, useClass: RoundServiceSpy },
        { provide: GroupService, useClass: GroupServiceSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [ GroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
