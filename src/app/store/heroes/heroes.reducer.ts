import { createReducer, on } from "@ngrx/store";
import { Hero } from "src/app/hero";
import { appendHero, replaceHero, deleteHero, editHero, cancelHero } from './heroes.actions'

export const initialState: Hero[] = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];

export const heroesReducer = createReducer<Hero[]>(
    initialState,
    on(appendHero, (state, action) => state.concat({
        name: action.name,
        id: Math.max(...state.map(h => h.id), 0) + 1,
    })),
    on(replaceHero, (state, action) => {
        const newHeroes = state.concat()
        newHeroes[newHeroes.findIndex(h => h.id === action.hero.id)] = action.hero
        return newHeroes
    }),
    on(deleteHero, (state, action) => state.filter(h => h.id !== action.heroId))
)

export const editHeroIdReducer = createReducer<number>(-1,
    on(editHero, (_, action) => action.heroId),
    on(replaceHero, () => -1,),
    on(deleteHero, () => -1),
    on(cancelHero, () => -1),

)