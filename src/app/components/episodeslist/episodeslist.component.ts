import { Component } from '@angular/core';
import { APiService } from 'src/app/services/api.service';
import { Observable, Subject, map, of, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-episodeslist',
  templateUrl: './episodeslist.component.html',
  styleUrls: ['./episodeslist.component.css']
})
export class EpisodeslistComponent {

  constructor(private apiService: APiService) {}

  data: any[] = []

  option = 'episode'

  unsubcribe$ = new Subject<void>();

  //method OnInit that call the addData method
  ngOnInit(): void {
    this.addData()
  }

  //same method that in CharacterList but this time I get all the episodes at once so I dont have to use a paginator
  addData() {
    this.apiService.getAllEpisodes().pipe(
      takeUntil(this.unsubcribe$),
      tap((results) => {
        if(results) {
          this.data = results
        }
      })).subscribe()
  }

  //unsubcribe when the API request end
  ngOnDestroy() {
    this.unsubcribe$.next()
  }
}
