import { Component } from '@angular/core';
import { APiService } from 'src/app/services/api.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent {
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
    this.apiService.getAllLocations().pipe(
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
