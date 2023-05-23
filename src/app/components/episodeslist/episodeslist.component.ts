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

  ngOnInit(): void {
    this.addData()
  }

  addData() {
    this.apiService.getAllEpisodes().pipe(
      takeUntil(this.unsubcribe$),
      tap((results) => {
        if(results) {
          this.data = results
        }
      })).subscribe()
  }

  ngOnDestroy() {
    this.unsubcribe$.next()
  }
}
