import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reset } from '../store/counter/counter.actions';
import { decrement } from '../store/counter/counter.actions';
import { increment } from '../store/counter/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  count$: Observable<number>;
  count = 0
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
 //define selector to pull from state
  increment() {
    this.store.dispatch(increment());
    this.count++
  }
 
  decrement() {
    this.store.dispatch(decrement());
    this.count--
  }
 
  reset() {
    this.store.dispatch(reset());
    this.count = 0
  }

}
