import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading$ = new Subject<boolean>();

  //in this two methods the Subject isLoading$ change its value depending on the state of the httpRequest
  show():void {
    this.isLoading$.next(true)
  }

  hide():void{
    this.isLoading$.next(false)
  }
}
