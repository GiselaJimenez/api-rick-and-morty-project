import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map, of, takeUntil, tap } from 'rxjs';
import { APiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-characterslist',
  templateUrl: './characterslist.component.html',
  styleUrls: ['./characterslist.component.css'],
})
export class CharacterslistComponent implements OnInit {
  searchTermChanged$ = new Subject<any>();
  filteredCharacters$ = new Observable<any>();
  characters$ = new Observable<any>();

  constructor(private apiService: APiService) {}

  data: any[] = [];

  public page = 1;

  private unsubcribe$ = new Subject<void>();

  option = 'character';

  filterCharacter = (characterList: any[], searchTerm: string): any[] =>
    characterList.filter((character: any) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  ngOnInit(): void {
    this.addData();

    this.searchTermChanged$
      .pipe(
        tap((searchTerm: string) => {
          this.filteredCharacters$ = this.characters$.pipe(
            map((characterList: any[]) =>
              this.filterCharacter(characterList, searchTerm)
            )
          );
        })
      )
      .subscribe();
  }

  onSearchFilterChanged(event: any) {
    this.searchTermChanged$.next(event.target.value);
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
  }

  addData() {
    console.log(this.page);
    this.apiService
      .getData(this.option, this.page)
      .pipe(
        takeUntil(this.unsubcribe$),
        tap((data) => {
          if (data) {
            this.data = data.results;
            this.characters$ = of(data.results);
            this.filteredCharacters$ = this.characters$;
          }
        })
      )

      .subscribe();
    console.log('llama data');
  }

  onPaginateChange(event: any) {
    console.log(event);
    if (event.pageIndex > 0) {
      this.page = event.pageIndex + 1;
    }
    if (event.pageIndex == 0) {
      this.page = 1;
    }
    this.addData();
  }
}
