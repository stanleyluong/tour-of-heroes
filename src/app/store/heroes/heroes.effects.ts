import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap} from "rxjs/operators";
import { of} from 'rxjs'
import { HeroService } from "src/app/hero.service";
import { loadHeroes, loadHeroesSuccess, loadHeroesError, appendHero, appendHeroError, appendHeroSuccess, deleteHero, deleteHeroError, deleteHeroSuccess, replaceHero, replaceHeroSuccess, replaceHeroError } from "./heroes.actions";

@Injectable()

export class HeroEffects {
    loadHeroes$ = createEffect(() => this.action$.pipe(
        ofType(loadHeroes),
        switchMap(() => this.heroService.all().pipe(
                map((heroes) => (loadHeroesSuccess({heroes}))),
                catchError(() => of(loadHeroesError))
        ))
    ))

    appendHero$ = createEffect(() => this.action$.pipe(
        ofType(appendHero),
        switchMap(({name}) => this.heroService.append(name).pipe(
            map((hero) => (appendHeroSuccess({hero}))),
            catchError(() => of(appendHeroError))
        ))
    ))
    
    deleteHero$ = createEffect(() => this.action$.pipe(
        ofType(deleteHero),
        switchMap(({heroId}) => this.heroService.delete(heroId).pipe(
            map(() => (deleteHeroSuccess({heroId}))),
            catchError(() => of(deleteHeroError))
        ))
    ))

    replaceHero$ = createEffect(() => this.action$.pipe(
        ofType(replaceHero),
        switchMap(({hero}) => this.heroService.replace(hero).pipe(
            map(() => (replaceHeroSuccess({hero}))),
            catchError(() => of(replaceHeroError))
        ))
    ))

    constructor( private action$: Actions, private heroService: HeroService ) {}
}