import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/app.reducer';
import * as AppActions from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'bible-translator';

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadBooks());
  }
}
