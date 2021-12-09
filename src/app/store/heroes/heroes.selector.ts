import { createSelector } from "@ngrx/store";
import { AppState } from '../../app-state';
import { Hero } from '../../hero';
export const heroRootSelector = (state: AppState) => state.heroes

export const uniqueHeroIds = createSelector(
    heroRootSelector,
    (heroes: Hero[]) => {
        return [...new Set(heroes.map(_ => _.id))]
    }
)
