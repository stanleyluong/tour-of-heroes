import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { HeroService } from '../hero.service';
import { AppState } from '../../app/app-state';
import { appendHero, replaceHero, deleteHero, editHero, cancelHero, getHero } from '../store/heroes/heroes.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;
  heroId$ = this.store.pipe(select(state => state.editHeroId))

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}


  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const heroId = Number(this.route.snapshot.paramMap.get('id'));
    // const editHeroId$ = this.store.pipe(select('editHeroId'));
    
    // this.store.dispatch()
    // this.store.dispatch(getHero({ heroId: heroId })).subscribe((hero: Hero) => this.hero = hero)
    this.heroService.getHero(heroId)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      // this.heroService.replace(this.hero)
      //   .subscribe(() => this.goBack());
      this.store.dispatch(replaceHero({hero: this.hero}))
      this.location.back()
    }
  }
}
