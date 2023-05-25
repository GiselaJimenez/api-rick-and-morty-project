import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{
  isLoading$ =  this.spinnerService.isLoading$

  constructor(private spinner: NgxSpinnerService, private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinner.show()
  }
}
