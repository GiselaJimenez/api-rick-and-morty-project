import { Component } from '@angular/core';
import { APiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-episodeslist',
  templateUrl: './episodeslist.component.html',
  styleUrls: ['./episodeslist.component.css']
})
export class EpisodeslistComponent {

  constructor(private apiService: APiService) {}

  data: any[] = []

  option = 'episode'

  ngOnInit(): void {
    this.addData()
  }

  addData() {
    this.apiService.getAllEpisodes()

  }
}
