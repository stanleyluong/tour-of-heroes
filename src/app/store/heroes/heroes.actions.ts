import { createAction, props } from '@ngrx/store'
import { Subject } from 'rxjs';
import { Hero } from 'src/app/hero'

export const loadHeroes = createAction('[Heroes] Load Heroes')
export const loadHeroesSuccess = createAction('[Heroes] Load Heroes Success', props<{ heroes: Hero[] }>())
export const loadHeroesError = createAction('[Heroes] Load Heroes Error');

export const appendHero = createAction('[Hero] Append Hero', props<{ name: string }>())
export const appendHeroSuccess = createAction('[Hero] Append Hero Success', props<{ hero: Hero }>())
export const appendHeroError = createAction('[Hero] Append Hero Error')

export const replaceHero = createAction('[Hero] Replace Hero', props<{ hero: Hero }>())
export const replaceHeroSuccess = createAction('[Hero] Replace Hero Success', props<{ hero: Hero }>())
export const replaceHeroError = createAction('[Hero] Replace Hero Error', props<{ hero: Hero }>())

export const deleteHero = createAction('[Hero] Delete Hero', props<{ heroId: number }>())
export const deleteHeroSuccess = createAction('[Hero] Delete Hero Success', props<{ heroId: number }>())
export const deleteHeroError = createAction('[Hero] Delete Hero Error')

export const searchHeroes = createAction('[Hero] Search Hero', props<{ term: string }>())