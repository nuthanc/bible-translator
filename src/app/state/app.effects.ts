import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { BibleVersion } from '../common/constants';
import { TranslatorService } from '../common/translator.service';
import * as AppActions from './app.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private translatorService: TranslatorService
  ) {}

  loadBooks$ = createEffect(() => {
    const url = `https://api.scripture.api.bible/v1/bibles/${BibleVersion.ENGLISH}/books`;

    return this.actions$.pipe(
      ofType(AppActions.loadBooks),
      mergeMap(() =>
        this.translatorService.getBooks(url).pipe(
          map((books) =>
            books.data.reduce((res, val) => {
              return {
                ...res,
                [val.name]: val.id,
              };
            }, {})
          ),
          map((books) => AppActions.loadBooksSuccess({ books })),
          catchError((error) => of(AppActions.loadBooksFailure({ error })))
        )
      )
    );
  });
}
