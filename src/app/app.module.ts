import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeroService } from './hero.service';
import { CounterComponent } from './counter/counter.component'
import { heroesReducer } from './store/heroes/heroes.reducer';
import { counterReducer } from './store/counter/counter.reducer';
import { HeroEffects } from './store/heroes/heroes.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    CounterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({
      heroes: heroesReducer,
      count: counterReducer
    }),
    StoreDevtoolsModule.instrument({ }),
    EffectsModule.forRoot([HeroEffects])
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})

export class AppModule { }
