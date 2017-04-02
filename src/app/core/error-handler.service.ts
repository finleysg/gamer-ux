import { Injectable, ErrorHandler } from '@angular/core';
import { Response } from '@angular/http';
import * as Raven from 'raven-js';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  isLocal = window.location.hostname.indexOf('localhost') >= 0;
  version = 'dev'; // TODO: get from window

  constructor(
  ) {
    super();
    if (!this.isLocal) {
      const options = { 'release': this.version, 'autoBreadcrumbs': { 'xhr': false }};
      Raven
        .config('get new dsn from raven', options)
        .install();
    }
  }

  handleError(err: any): void {
    if (this.isLocal) {
      super.handleError(err);
    } else {
      Raven.captureException(err.originalError);
    }
  }

  logError(err: any): void {
    if (this.isLocal) {
      console.error(err.toString());
    } else {
      Raven.captureException(err);
    }
  }

  logResponse(message: string, response: Response) {
    if (this.isLocal) {
      // TODO: handle text or blob responses
      console.info(`${response.status}: ${JSON.stringify(response.json())}`)
    } else {
      const options: any = {
        level: 'error',
        extra: {'response': response}
      };
      Raven.captureMessage(message, options)
    }
  }

  logWarning(message: string): void {
    if (this.isLocal) {
      console.warn(message);
    } else {
      Raven.captureMessage(message, {level: 'warning'});
    }
  }

  logMessage(message: string): void {
    if (this.isLocal) {
      console.info(message);
    }
  }
}
