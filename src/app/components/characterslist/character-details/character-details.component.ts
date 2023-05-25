import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, take } from 'rxjs'

import { APiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit{

  character$!: Observable<any>

  constructor( private apiService: APiService, private route: ActivatedRoute, private location: Location) {

  }

  //get details with the method in ApiService giving the id of the character
  ngOnInit(): void {
    this.route.params.pipe( take(1) ).subscribe((params: Params) => {
      const id = params['id']
      this.character$ = this.apiService.getDetails(id)
    })
  }

  //go to character list again
  onGoBack() {
    this.location.back()
  }

}
