import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { counterReducer } from "./counter/counter.reducer";

export interface RootState {
  count: number
}

export const reducers: ActionReducerMap<RootState> = {
  count: counterReducer
}

export const metaReducers: MetaReducer[] = [
]