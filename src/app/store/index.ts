import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { counterReducer } from "./counter/counter.reducer";
import { heroesReducer } from "./heroes/heroes.reducer";
export interface RootState {
  count: number
}

export const reducers: ActionReducerMap<RootState> = {
  count: counterReducer,
  // hero: heroesReducer
}

export const metaReducers: MetaReducer[] = [
]