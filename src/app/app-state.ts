import { Hero } from "./hero";

export interface AppState {
    heroes: Hero[];
    editHeroId: number;
}