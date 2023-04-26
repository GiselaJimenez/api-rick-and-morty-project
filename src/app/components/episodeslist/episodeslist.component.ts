import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { APiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-episodeslist',
  templateUrl: './episodeslist.component.html',
  styleUrls: ['./episodeslist.component.css']
})
export class EpisodeslistComponent {

  constructor(private apiService: APiService) {}

  data: any[] = []

  public page = 1

  private unsubcribe$ = new Subject<void>();

  option = 'episode'

  ngOnInit(): void {
    this.addData()
  }

  ngOnDestroy() {this.unsubcribe$.next()}

  addData() {
    console.log(this.page)
    this.apiService.getData(this.option, this.page)
    .pipe(takeUntil(this.unsubcribe$)).
    subscribe(data=> {
      if(data)
      this.data = data.results
    })
    console.log("llama data")
  }

  onPaginateChange(event: any){
    if(event.pageIndex > 0) {
      this.page = event.pageIndex + 1
    }
    this.addData()
  }
}
