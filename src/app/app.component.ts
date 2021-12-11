import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app-state';
import { Hero } from './hero';
import { loadHeroes, loadHeroesSuccess } from './store/heroes/heroes.actions';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store:Store<AppState>, private heroService:HeroService){}
//effects lsitens to getheros actions, calls heroservice to set heroes. effects should do this below instead. think through, observe this, finish act of removing heroservice from this whole thing. replace heroservice usage from whole app with ngrx selectors pulling from state, set in ngrx with action. effect is replacing call to the remote service. if there are side effects it should happen in effects. any interaction with services will be in effects. read effets, wire it in, go from there. stack up questions for next meet.
  ngOnInit(): void {
    this.store.dispatch(loadHeroes())
    // this.store.dispatch(getHeroes() )
    // this.getHeroes();
    // this.heroService.all().subscribe((data) => {
    //   console.log('data', data)
    //   //cmd fn f2 to change all occurences in file
    //   this.store.dispatch(loadHeroesSuccess({ heroes: data as Hero[]}))
    //   // this.heroes$ = this.store.select(state => state.heroes)
    //   // this.heroes$ = this.store.select(state=> state.heroes)
    //   // this.store.pipe(select(uniqueHeroIds))
    // });
  }

 
  title = 'Tour of Heroes';
}
