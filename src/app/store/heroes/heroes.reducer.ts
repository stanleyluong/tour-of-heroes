import { createReducer, createSelector, on } from "@ngrx/store";
import { appendHero, replaceHero, deleteHero, editHero, cancelHero, setHeroesAction } from './heroes.actions'
import { Hero } from "src/app/hero";
import { HeroService } from '../../hero.service'; 
import { AppState } from "src/app/app-state";

export const initialState: Hero[] = [
    // { id: 1, name: "x"}
];
//reducers to update state, selectors to get state, actions dispatched to tell system you want ot do something with action
export const heroesReducer = createReducer<Hero[]>(
    initialState, 
    //ambiguous, getHeroesAction
    //setHeroes?
    on(setHeroesAction, (state, action) => {
        return [...action.heroes]
    }),
    on(appendHero, (state, action) => state.concat({
        name: action.name,
        id: Math.max(...state.map(h => h.id), 0) + 1,
    })),
    on(replaceHero, (state, action) => {
        const newHeroes = state.concat()
        newHeroes[newHeroes.findIndex(h => h.id === action.hero.id)] = action.hero
        return newHeroes
    }),
    // on(editHero, (state, action) => {
    //     const newHeroes = state.concat()
    //     newHeroes[newHeroes.findIndex(h => h.id === action.heroId)] = action.hero
    //     return newHeroes
    // }),
    // on(getHeroes, (state, action) => )
    on(deleteHero, (state, action) => state.filter(h => h.id !== action.heroId))
)

export const editHeroIdReducer = createReducer<number>(-1,
    on(editHero, (_, action) => action.heroId),
    on(replaceHero, () => -1,),
    on(deleteHero, () => -1),
    on(cancelHero, () => -1),

)

export const selectHeroes = (state:AppState) => {
    return state.heroes
}

// export const selectAllHeroes = createSelector((state) => {
//     return state.heroes
// })