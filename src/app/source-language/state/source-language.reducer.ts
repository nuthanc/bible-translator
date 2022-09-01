import { createReducer, on } from '@ngrx/store';
import * as SourceLanguageActions from './source-language.actions';

// srcText?
export interface State {
  searchText: string;
}

const initialState: State = {
  searchText: '',
};

export const sourceLanguageReducer = createReducer<State>(
  initialState,
  on(SourceLanguageActions.setSearchText, (state: State, action) => ({
    ...state,
    searchText: action.searchText,
  }))
);
