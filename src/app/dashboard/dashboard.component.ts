import { Component } from '@angular/core';
// import { Hero } from '../hero';
// import { HeroService } from '../hero.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app/app-state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent {
  // heroes: Hero[] = [];
  heroes$ = this.store.pipe(select(state => state.heroes))
  // editHeroId$ = this.store.pipe(select('editHeroId'));

  constructor(private store: Store<AppState>,) { }

  // ngOnInit(): void {
  //   this.getHeroes();
  // }

  // getHeroes(): void {
  //   this.heroService.all()
  //     .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  // }
}