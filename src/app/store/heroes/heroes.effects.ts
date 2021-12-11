import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap} from "rxjs/operators";
import { of} from 'rxjs'
import { HeroService } from "src/app/hero.service";
import { loadHeroes, loadHeroesSuccess, loadHeroesError } from "./heroes.actions";

@Injectable()

export class HeroEffects {
    loadHeroes$ = createEffect(() => this.action$.pipe(
            ofType(loadHeroes),
            switchMap(() => this.heroService.all().pipe(
                    map((heroes) => (loadHeroesSuccess({heroes}))),
                    catchError(() => of(loadHeroesError))
            )
        )
    )
)

    constructor( private action$: Actions, private heroService: HeroService ) {}
}