import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/book.reducer';
import * as BookActions from './state/book.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bible-translator';

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooks());
  }
}
