import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { selectHeroes } from '../store/heroes/heroes.reducer';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent {

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private store:Store<AppState>) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  heroes$!: Observable<Hero[]>;
  // heroes$ = combineLatest([ this.store.select(selectHeroes), this.searchTerms]).pipe(
  //   map(([ heroes, searchTerms ]) => {
  //     return heroes.filter(h=> h.name.toLowerCase().includes(searchTerms.toLowerCase()))
  //   })
  // )

  // heroes$ = withLatestFrom([ this.store.select(selectHeroes), this.searchTerms]).pipe(
  //   map(([ heroes, searchTerms ]) => {
  //     return heroes.filter(h=> h.name.toLowerCase().includes(searchTerms.toLowerCase()))
  //   })
  // )

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      withLatestFrom(this.store.select(selectHeroes)),
      map(([term, heroes]) => {
        return heroes.filter(h=> h.name.toLowerCase().includes(term.toLowerCase()))
      })
      // switchMap((term: string) => this.heroService.searchHeroes(term)),
      // switchMap((term: string) => this.store.dispatch(searchHeroes(term)),
      //store search in state?
      //use combinelatest on heroes$ and search term, heroes array and term and use those to return new heroes array
      //need new state for search heroes, filter heroes list in this state. does not need api request. use combinelatest, withlatestfrom, two separate approaches. 
    );
  }
  
}

//only returns exact name, fix it so it returns all heroes beginning with beginning with letters