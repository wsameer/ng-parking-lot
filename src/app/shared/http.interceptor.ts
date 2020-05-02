import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of, throwError } from "rxjs";
import { tap, catchError, retry } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(public toastrService: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status) {
          this.toastrService.error(error.message, '');
        } else {
          console.error(error);
          return throwError(error);
        }
      })
    );
  }
}