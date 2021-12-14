import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap, mergeMap} from "rxjs/operators";
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
//switch map will cancel 1st one if you double click on accident, switches what you listen to to the other, unsubs from 1st and subs to second
    appendHero$ = createEffect(() => this.action$.pipe(
        ofType(appendHero),
        mergeMap(({name}) => this.heroService.append(name).pipe(
            map((hero) => (appendHeroSuccess({hero}))),
            catchError(() => of(appendHeroError))
        ))
    ))
    //
    //merge map vs switch map
    deleteHero$ = createEffect(() => this.action$.pipe(
        ofType(deleteHero),
        mergeMap(({heroId}) => this.heroService.delete(heroId).pipe(
            map(() => (deleteHeroSuccess({heroId}))),
            catchError(() => of(deleteHeroError))
        ))
    ))
//if theres checkboxes to delete heroes, usually only last one checked will go through if you use switchmap, with mergemap all will go through. will be unpredictable depending on network.
    replaceHero$ = createEffect(() => this.action$.pipe(
        ofType(replaceHero),
        mergeMap(({hero}) => this.heroService.replace(hero).pipe(
            map(() => (replaceHeroSuccess({hero}))),
            catchError(() => of(replaceHeroError))
        ))
    ))
//should be mergemap. with swtichmap therell be issues when theres multiple requests happening before response. 
    constructor( private action$: Actions, private heroService: HeroService ) {}
}