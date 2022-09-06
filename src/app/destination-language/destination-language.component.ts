import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, map, switchMap, forkJoin, Observable, tap } from 'rxjs';
import { TranslatorService } from '../common/translator.service';

@Component({
  selector: 'app-destination-language',
  templateUrl: './destination-language.component.html',
  styleUrls: ['./destination-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationLanguageComponent implements OnInit {
  content$!: Observable<any>;
  constructor(private translatorService: TranslatorService) {}

  ngOnInit(): void {
    this.content$ = this.translatorService.versesSource$.pipe(
      debounceTime(500),
      switchMap((verseArray) => {
        const observableArray = this.allVerses(verseArray);
        return forkJoin(observableArray);
      }),
      map((verses) => verses.map((verse) => verse.data.content)),
      tap((val) => console.log(val))
    );
  }

  allVerses(verseArray: number[]) {
    const observableArray = [];
    if (verseArray.length) {
      const start = verseArray[0];
      const end = verseArray?.[1] ?? verseArray[0];
      for (let i = start; i <= end; i++) {
        observableArray.push(this.translatorService.getVerse(i));
      }
    }
    return observableArray;
  }
}
