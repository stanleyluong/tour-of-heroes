import { createReducer, on } from "@ngrx/store";
import { appendHero, replaceHero, deleteHero, editHero, cancelHero, getHeroes } from './heroes.actions'
import { Hero } from "src/app/hero";
import { HeroService } from '../../hero.service'; 

export const initialState: Hero[] = [
    // { id: 1, name: "x"}
];

export const heroesReducer = createReducer<Hero[]>(
    initialState, 
    on(getHeroes, (state, action) => {
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