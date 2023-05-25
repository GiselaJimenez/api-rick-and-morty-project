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

  //search method, take the character that includes the search term in their name
  filterCharacter = (characterList: any[], searchTerm: string): any[] =>
    characterList.filter((character: any) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  //method OnInit, call the addData method and detect when the text in the input change
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

  //take the text in the input
  onSearchFilterChanged(event: any) {
    this.searchTermChanged$.next(event.target.value);
  }

  //unsubcribe when the API request end
  ngOnDestroy() {
    this.unsubcribe$.next();
  }

  //method for getting the data from the API, with the option (character) and the page take 20 characters from the API at the same time
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
      ).subscribe();
    console.log('llama data');
  }

  //when the page changes the paarameter of the API also changes (because it's a paginate API) and I have to change it manually
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
