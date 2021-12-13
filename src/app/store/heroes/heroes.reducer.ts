import { createReducer, on } from "@ngrx/store";
import { replaceHero, loadHeroesSuccess, appendHeroSuccess, deleteHeroSuccess } from './heroes.actions'
import { Hero } from "src/app/hero";
import { AppState } from "src/app/app-state";

export const initialState: Hero[] = []
//reducers to update state, selectors to get state, actions dispatched to tell system you want ot do something with action
export const heroesReducer = createReducer<Hero[]>(
    initialState,
    on(loadHeroesSuccess, (state, action) => {
        return [...action.heroes]
    }),
    on(appendHeroSuccess, (state, action) => state.concat(action.hero)),
    on(deleteHeroSuccess, (state, action) => state.filter(h => h.id !== action.heroId)),
    on(replaceHero, (state, action) => {
        const newHeroes = state.concat()
        newHeroes[newHeroes.findIndex(h => h.id === action.hero.id)] = action.hero
        return newHeroes
    })
)

export const selectHeroes = (state:AppState) => {
    return state.heroes
}