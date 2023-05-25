import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{
  //this observable indicates if is an http request going on, if it is then it is shown (the subcription is in the .html with a | async)
  isLoading$ =  this.spinnerService.isLoading$

  constructor(private spinner: NgxSpinnerService, private spinnerService: SpinnerService) {}

  //spinner shows
  ngOnInit(): void {
    this.spinner.show()
  }
}
