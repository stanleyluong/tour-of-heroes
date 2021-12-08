import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { AppState } from '../../app/app-state';
import { appendHero, replaceHero, deleteHero, editHero, cancelHero } from '../store/heroes/heroes.actions';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {

  heroes$ = this.store.pipe(select(state => state.heroes))
  editHeroId$ = this.store.pipe(select('editHeroId'));
  // heroes: Hero[] = [];

  constructor(private store: Store<AppState>, private messageService: MessageService) { }

  add(name: string) {
    console.log(this.heroes$)
    this.store.dispatch(appendHero({ name }))
  }

  delete(heroId: number) {
    this.store.dispatch(deleteHero({ heroId }))
  }

  // ngOnInit(): void {
  //   this.getHeroes();
  // }

  // getHeroes(): void {
  //   this.heroService.all().subscribe(heroes => this.heroes = heroes);
  //   this.store.dispatch(getHeroes())
  // }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.append({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }
  
  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.delete(hero.id).subscribe();
  // }
}