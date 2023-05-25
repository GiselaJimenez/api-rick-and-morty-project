import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}
  //when an API request is active the spinner shows and when it ends the spinner hides
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show()
    return next.handle(req).pipe(
      finalize( () => {
        this.spinnerService.hide()
      })
    )
  }
}
