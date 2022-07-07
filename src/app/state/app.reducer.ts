import {
  createReducer,
  on,
} from '@ngrx/store';
import * as AppActions from './app.actions';

export interface BookEntry {
  [key: string]: string;
}

export interface State {
  books: BookEntry;
  error: string;
}

// Add reducer for books state
const initialState = {
  books: {},
  error: '',
};


export const appReducer = createReducer<State>(
  initialState,
  on(AppActions.loadBooksSuccess, (state: State, action) => {
    return {
      ...state,
      books: action.books,
    };
  }),
  on(AppActions.loadBooksFailure, (state: State, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
