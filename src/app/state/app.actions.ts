import { createAction, props } from '@ngrx/store';

export const loadBooks = createAction('[App] Load Books');

export const loadBooksSuccess = createAction(
  '[App] Load Books Success',
  props<{ books: Record<string, string> }>()
);

export const loadBooksFailure = createAction(
  '[App] Load Books Failure',
  props<{ error: string }>()
);
