import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as BookActions from './book.actions';

export interface BookEntry {
  [key: string]: string;
}

export interface State {
  books: BookEntry;
  error: string;
}

// Add reducer for books state
const initialState: State = {
  books: {},
  error: '',
};

const getBooksFeatureState = createFeatureSelector<State>('books');

export const getBooksSelector = createSelector(
  getBooksFeatureState,
  (state) => state.books
);

export const bookReducer = createReducer<State>(
  initialState,
  on(BookActions.loadBooksSuccess, (state: State, action) => {
    return {
      ...state,
      books: action.books,
    };
  }),
  on(BookActions.loadBooksFailure, (state: State, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);
