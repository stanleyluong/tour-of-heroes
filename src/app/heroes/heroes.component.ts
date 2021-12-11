import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { AppState } from '../../app/app-state';
import { appendHero, deleteHero } from '../store/heroes/heroes.actions';
import { Observable } from 'rxjs';
import { selectHeroes } from '../store/heroes/heroes.reducer';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
heroes$: Observable<Hero[]> = this.store.select(selectHeroes)
//abstract to selector^
  // heroes$ = this.store.select(state => state.heroes)
  // heroes$: Hero[] = [];
  // heroes = []

  constructor(private store: Store<AppState>, private messageService: MessageService, private heroService: HeroService) { }

  add(name: string) {
    let newHero = {
      id: Math.random(),
      name: name
    }
    this.heroService.append(newHero).subscribe(hero => {
      console.log('adding', hero)
      this.store.dispatch(appendHero({hero}))
    })
  }

  delete(heroId: number) {
    this.store.dispatch(deleteHero({ heroId }))
    this.heroService.delete(heroId).subscribe(data => {
      console.log('delete id',heroId)
    })
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