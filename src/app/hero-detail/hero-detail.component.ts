import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { HeroService } from '../hero.service';
import { AppState } from '../../app/app-state';
import { appendHero, replaceHero, deleteHero, editHero, cancelHero, getHero } from '../store/heroes/heroes.actions';
import { selectHeroes } from '../store/heroes/heroes.reducer';
import { combineLatest, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
//won't fire if not subscribed to, use async pipe to sub
  heroId$ = this.route.params.pipe(
    map((params) => {
      console.log('params',params)
      return params['id']
    })
  )
  //^params is observable, snapshot.params is not
  // @Input() hero?: Hero;
  // use ^ if dumb component, can't use input on routed component
  // heroId$ = this.store.pipe(select(state => state.editHeroId))
  //use ^ if not dumb component
  //use ^ if not dumb component
  hero: Hero | undefined;//avoid local variable if possible but sometimes makes sense

  // hero$ = this.store.pipe(
  //   select(selectHeroes),//will run because async pipe subscribe
  //   map(heroes => {return heroes[0]}),
  //   tap(hero => {this.hero = hero})//useful for debugging with console log
  // )

  heroes$ = this.store.pipe(select(selectHeroes))
  //use combine latest to grab heroid$ out of heroes$
  hero$ = combineLatest([this.heroId$, this.heroes$]).pipe(
    map(([heroId, heroes]) => {
      return heroes.find(hero => hero.id == heroId)//add error checking if unfound
    }),
    filter(bool => !!bool ),// filters out all falsey
    map(hero => {
      // return JSON.parse(JSON.stringify(hero))//expensive, deepcopy, quick

      return {...hero} as Hero//only top level works, if there are multiple levels of objects/arrays then need to use above method
      // return {
      //   id: hero ? hero.id : 0,
      //   name: hero ? hero.name : ''
      // }//destructuring removes inherent typescript type checking
      // return {
      //   ...hero,
      //   powers: [...hero.powers]//sometimes messy, do parse/stringify instead
      // }//do it this way to dereference fully
    }),
    tap(hero => {this.hero = hero})//useful for debugging with console log

  )
  //put in array
//this.store.select() is same(shortcut) this.store.pipe(select())
//do 2nd way to operate on it with rxjs operators 
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    // this.heroId$.subscribe()
  }


  ngOnInit(): void {
    this.getHero()
    // this.hero$.subscribe((hero) => { this.hero = hero})
    //memory leak this way ^ if we dont unsubscribe
  }
  
  getHero(): void {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    // const editHeroId$ = this.store.pipe(select('editHeroId'));
    
    // this.store.dispatch()
    // this.store.dispatch(getHero({ heroId: heroId })).subscribe((hero: Hero) => this.hero = hero)
    // this.heroService.getHero(heroId)
    //   .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.store.dispatch(replaceHero({hero: this.hero}))
      this.heroService.replace(this.hero)
        .subscribe(() => this.goBack());
      // this.heroService.replace(this.hero)
      // this.location.back()
    }
  }
}
