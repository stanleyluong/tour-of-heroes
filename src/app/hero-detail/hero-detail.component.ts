import { Component } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app/app-state';
import { replaceHero } from '../store/heroes/heroes.actions';
import { selectHeroes } from '../store/heroes/heroes.reducer';
import { combineLatest, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent {
  heroId$ = this.route.params.pipe(
    map((params) => {
      return params['id']
    })
  )
  hero: Hero | undefined;
  
  heroes$ = this.store.pipe(select(selectHeroes))
  // pipe takes comma separated list of rxjs operators
  hero$ = combineLatest([this.heroId$, this.heroes$]).pipe(
    map(([heroId, heroes]) => {
      return heroes.find(hero => hero.id == heroId)
      //add error checking if unfound
    }),
    filter(bool => !!bool ),
    map(hero => {
      return {...hero} as Hero
    }),
    tap(hero => {this.hero = hero})
  )

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.store.dispatch(replaceHero({hero: this.hero}))
    }
    this.goBack()
  }

}
