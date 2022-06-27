import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, Subject } from 'rxjs';

// 'https://api.scripture.api.bible/v1/bibles/a33a100f04f2752e-01/verses/GEN.1.1?include-chapter-numbers=false&include-verse-numbers=false&include-titles=false&content-type=text'
// https://scripture.api.bible/livedocs#/Search

export interface VerseResponse {
  data: {
    content: string;
    bookId: string;
    chapterId: string;
  };
}

export type BookObject = {
  id: string;
  name: string;
};

export interface BookListResponse {
  data: BookObject[];
}

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  private searchText = new Subject<string>();
  searchText$ = this.searchText.asObservable();
  headers = new HttpHeaders().append(
    'api-key',
    'a1be70653b141ccd25b339e9be580d5a'
  );
  englishVersionId = '06125adad2d5898a-01';
  kannadaBibleVersionId = 'a33a100f04f2752e-01';
  destLanguage$!: Observable<VerseResponse>;
  bookDict!: Record<string, any>;

  constructor(private http: HttpClient) {
    this.http
      .get<BookListResponse>(
        `https://api.scripture.api.bible/v1/bibles/${this.englishVersionId}/books`,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((resp) => {
          return resp.data.reduce((res, val) => {
            return {
              ...res,
              [val.name]: val.id,
            };
          }, {});
        })
      )
      .subscribe((bookDict) => (this.bookDict = bookDict));
  }

  setSearchText(text: string) {
    this.parseText(text);
  }

  parseText(text: string) {
    if (text) {
      const trimmedText = text.trim();
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
        const key =
          Object.keys(this.bookDict).find((key) => key.includes(book)) ?? 'GEN';
        const parsedText = `${this.bookDict[key]}.${chapter}.${verse}`;
        this.setDestLanguage(parsedText);
        this.searchText.next(text);
      }
    }
  }

  setDestLanguage(parsedText: string) {
    this.destLanguage$ = this.http
      .get<VerseResponse>(
        `https://api.scripture.api.bible/v1/bibles/a33a100f04f2752e-01/verses/${parsedText}?include-chapter-numbers=false&include-verse-numbers=false&include-titles=false&content-type=text`,
        { headers: this.headers }
      )
      .pipe(catchError(() => EMPTY));
  }
}
