import { createAction, props } from '@ngrx/store';
import { BookEntry } from './book.reducer';

export const loadBooks = createAction('[App] Load Books');

export const loadBooksSuccess = createAction(
  '[App] Load Books Success',
  props<{ books: BookEntry }>()
);

export const loadBooksFailure = createAction(
  '[App] Load Books Failure',
  props<{ error: string }>()
);
