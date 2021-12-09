import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { AppState } from '../../app/app-state';
import { appendHero, replaceHero, deleteHero, editHero, cancelHero, getHeroes } from '../store/heroes/heroes.actions';
import { Observable } from 'rxjs';
import { uniqueHeroIds } from '../store/heroes/heroes.selector';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // heroes$: Hero[] = this.store.select(state => state.heroes)
  heroes$: Hero[] = [];

  constructor(private store: Store<AppState>, private messageService: MessageService, private heroService: HeroService) { }

  ngOnInit(): void {
    // this.store.dispatch(getHeroes() )
    // this.getHeroes();
    this.heroService.all().subscribe((data) => {
      console.log('data', data)
      this.store.dispatch(getHeroes({ heroes: data as Hero[]}))
      // this.heroes$ = this.store.select(state => state.heroes)
      // this.store.pipe(select(uniqueHeroIds))
    });

  }

  add(name: string) {
    // console.log(this.heroes$)
    this.store.dispatch(appendHero({ name }))
    this.heroService.append(name)
  }

  delete(heroId: number) {
    this.store.dispatch(deleteHero({ heroId }))
  }

  // ngOnInit(): void {
  //   this.getHeroes();
  // }

  // getHeroes(): void {
  //   this.heroService.all().subscribe(heroes => this.heroes = heroes);
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