import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, Observable, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookListResponse } from '../models/books.model';
import { getBooksSelector, State } from '../state/book.reducer';
import { BASE_URL, BibleVersion } from './constants';

// 'https://api.scripture.api.bible/v1/bibles/a33a100f04f2752e-01/verses/GEN.1.1?include-chapter-numbers=false&include-verse-numbers=false&include-titles=false&content-type=text'
// https://scripture.api.bible/livedocs#/Search

export interface VerseResponse {
  data: {
    content: string;
    bookId: string;
    chapterId: string;
  };
}

const headers = new HttpHeaders().append('api-key', environment.api_key);

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  private versesSource = new Subject<number[]>();
  versesSource$: Observable<number[]> = this.versesSource.asObservable();
  chapter!: string;
  verse!: string;
  book!: string;
  bookDict!: Record<string, string>;

  destLanguageText$!: Observable<VerseResponse>;

  constructor(private http: HttpClient, private store: Store<State>) {}

  setSearchText(text: string): void {
    this.parseText(text);
  }

  getBooks(url: string): Observable<BookListResponse> {
    return this.http.get<BookListResponse>(url, {
      headers: headers,
    });
  }

  parseText(text: string): void {
    if (text) {
      let trimmedText = text.trim();
      let endVerse;
      if (trimmedText.includes('-')) {
        [trimmedText, endVerse] = trimmedText.split('-');
      }
      let book = trimmedText.match(/[A-Za-z]+/)?.[0] || '';
      const numbers = trimmedText.match(/\d+/g);
      let chapter, verse;
      if (numbers?.length === 2) {
        chapter = numbers[0];
        verse = numbers[1];
      } else if (numbers?.length === 3) {
        book = `${numbers[0]} ${book}`;
        chapter = numbers[1];
        verse = numbers[2];
      }
      if (book && chapter && verse) {
        this.store
          .select(getBooksSelector)
          .pipe(take(1))
          .subscribe((val) => {
            this.bookDict = val;
          });
        this.chapter = chapter;
        this.verse = verse;
        const key =
          Object.keys(this.bookDict).find((key) => key.includes(book)) ?? 'GEN';
        this.book = this.bookDict[key];

        const verseArray = [Number(verse)];
        if (endVerse) {
          verseArray.push(Number(endVerse));
        }
        this.versesSource.next(verseArray);
      }
    }
  }

  getVerse(verse: number): Observable<VerseResponse> {
    const parsedText = `${this.book}.${this.chapter}.${verse}`;
    return this.http
      .get<VerseResponse>(
        `${BASE_URL}/${BibleVersion.KANNADA}/verses/${parsedText}?include-chapter-numbers=false&include-verse-numbers=false&include-titles=false&content-type=text`,
        { headers: headers }
      )
      .pipe(catchError(() => EMPTY));
  }
}
