import { TestBed, inject } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { DataService } from './data.service';
import { ErrorHandlerService } from './error-handler.service';

describe('DataService', () => {

  @Injectable()
  class ErrorHandlerServiceSpy {
    // TODO
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        DataService,
        { provide: ErrorHandlerService, useClass: ErrorHandlerServiceSpy },
        { provide: XHRBackend, useClass: MockBackend }      ]
    });
  });

  it('should ...', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
