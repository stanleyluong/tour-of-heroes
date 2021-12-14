import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
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
  
  heroes$ = combineLatest([ this.store.select(selectHeroes), this.searchTerms]).pipe(
    map(([ heroes, searchTerms ]) => {
      return heroes.filter(h=> h.name.toLowerCase().includes(searchTerms.toLowerCase()))
    })
    )
    
  // heroes$!: Observable<Hero[]>;
  // ngOnInit(): void {
  //   this.heroes$ = this.searchTerms.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     withLatestFrom(this.store.select(selectHeroes)),
  //     map(([term, heroes]) => {
  //       return heroes.filter(h=> h.name.toLowerCase().includes(term.toLowerCase()))
  //     })
  //   );
  // }
  //^still works without implements OnInit??
}