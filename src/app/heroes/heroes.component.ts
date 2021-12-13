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

  constructor(private store: Store<AppState>, private messageService: MessageService, private heroService: HeroService) { }

  add(name: string) {
    this.store.dispatch(appendHero({ name }))
  }

  delete(heroId: number) {
    this.store.dispatch(deleteHero({ heroId }))
  }
}