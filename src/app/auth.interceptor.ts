import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    alert('16 aut int')
    let modifiedReq = request.clone({
      headers: this.addExtraHeaders(request.headers)
    })
    // return next.handle(request);
    return next.handle(modifiedReq).pipe(
      map((event: HttpEvent<any>) => {
          return event;
      }));
  }

  private addExtraHeaders(headers: HttpHeaders) {
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return headers;
  }
}
