import { createAction, props } from '@ngrx/store'
import { Hero } from 'src/app/hero'
export const setHeroesAction = createAction('[Heroes API] API Success', props<{ heroes: Hero[] }>())
export const getHero = createAction('[Hero] Get Hero', props<{ heroId: number }>())
export const appendHero = createAction('[Hero] Append Hero', props<{ name: string }>())
export const replaceHero = createAction('[Hero] Replace Hero', props<{ hero: Hero }>())
export const deleteHero = createAction('[Hero] Delete Hero', props<{ heroId: number }>())
export const editHero = createAction('[Hero] Edit Hero', props<{ heroId: number}>())
export const cancelHero = createAction('[Hero] Cancel Hero')
