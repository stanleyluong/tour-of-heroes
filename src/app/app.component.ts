import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app-state';
import { loadHeroes } from './store/heroes/heroes.actions';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store:Store<AppState>, private heroService:HeroService){}

  ngOnInit(): void {
    this.store.dispatch(loadHeroes())
  }

  title = 'Tour of Heroes';
  
}
