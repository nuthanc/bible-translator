import { createAction, props } from '@ngrx/store';

export const setSearchText = createAction(
  '[Source Language] Set Search Text',
  props<{ searchText: string }>()
);