import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { APiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-characterslist',
  templateUrl: './characterslist.component.html',
  styleUrls: ['./characterslist.component.css']
})
export class CharacterslistComponent implements OnInit{

  constructor(private apiService: APiService) {}

  data: any[] = []

  private unsubcribe$ = new Subject<void>();

  option = 'character'

  public page !: number

  ngOnInit(): void {
    this.addData()
  }

  ngOnDestroy() {this.unsubcribe$.next()}

  addData() {
    this.apiService.getData(this.option)
    .pipe(takeUntil(this.unsubcribe$)).
    subscribe(data=> {
      this.data = data.results
    })
  }
}
