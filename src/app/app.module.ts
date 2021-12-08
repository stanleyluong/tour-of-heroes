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
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store'
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';
import { CounterComponent } from './counter/counter.component'
import { editHeroIdReducer, heroesReducer } from './store/heroes/heroes.reducer';
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
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    HttpClientInMemoryWebApiModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot({
      heroes: heroesReducer,
      editHeroId: editHeroIdReducer
    }),
    StoreDevtoolsModule.instrument({ }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
