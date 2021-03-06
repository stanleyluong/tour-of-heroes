import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, switchMap, take } from 'rxjs/operators';
import { AppState } from "src/app/app-state";
import { Store } from '@ngrx/store';
import { selectHeroes } from './store/heroes/heroes.reducer';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private httpClient: HttpClient, private messageService: MessageService, private store:Store<AppState>) { }  
 
  _baseUrl = 'https://tour-of-heroes-server.herokuapp.com/heroes'

  heroes$ = this.store.select(selectHeroes)

  private getCollectionUrl(){
    return this._baseUrl
  }

  private getElementUrl(elementId: any) {
    return this._baseUrl + '/' + encodeURIComponent(String(elementId))
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  all() {
    return this.httpClient.get<Hero[]>(this.getCollectionUrl())
    .pipe(
            map(((( data: Hero[] ) => data))),
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getHeroes', []))
          );
  }

  append(name: string): Observable<Hero> {
    return this.heroes$.pipe(
      take(1),
      map((heroes) => {
        return Math.max(...heroes.map(h => h.id)) + 1
      }),
      switchMap((maxId) => {
        let hero = {id: maxId, name: name }
        return this.httpClient.post<Hero>(this.getCollectionUrl(), hero, this.httpOptions) 
        .pipe(
          tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
          catchError(this.handleError<Hero>('addHero'))
          );
        })
    )
  }

  replace(hero: Hero) {
    return this.httpClient.put<Hero>(this.getElementUrl(hero.id), hero, this.httpOptions)
    .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
  }

  delete(heroId: number): Observable<Hero> {
    return this.httpClient.delete<Hero>(this.getElementUrl(heroId), this.httpOptions)
    .pipe(
          tap(_ => this.log(`deleted hero id=${heroId}`)),
          catchError(this.handleError<Hero>('deleteHero'))
        );
  }
  
}
