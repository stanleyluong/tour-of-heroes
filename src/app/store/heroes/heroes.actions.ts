import { createAction, props } from '@ngrx/store'
import { Hero } from 'src/app/hero'
export const loadHeroesSuccess = createAction('[Heroes API] API Success', props<{ heroes: Hero[] }>())
export const loadHeroes = createAction('[Heroes] Load Heroes')
// export const loadHeroesSuccess = createAction('[Heroes] Load Heroes Success', props<{heroes: Hero[]}>());
export const loadHeroesError = createAction('[Heroes] Load Heroes Error');
export const getHero = createAction('[Hero] Get Hero', props<{ heroId: number }>())
export const appendHero = createAction('[Hero] Append Hero', props<{ hero: Hero }>())
export const replaceHero = createAction('[Hero] Replace Hero', props<{ hero: Hero }>())
export const deleteHero = createAction('[Hero] Delete Hero', props<{ heroId: number }>())
export const editHero = createAction('[Hero] Edit Hero', props<{ heroId: number}>())
export const cancelHero = createAction('[Hero] Cancel Hero')
