import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, filter, map, switchMap } from 'rxjs';
import { TranslatorService } from '../common/translator.service';

@Component({
  selector: 'app-destination-language',
  templateUrl: './destination-language.component.html',
  styleUrls: ['./destination-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationLanguageComponent implements OnInit {
  content$ = this.translatorService.searchText$.pipe(
    filter((reference) => Boolean(reference)),
    debounceTime(500),
    switchMap(() => this.translatorService.destLanguage$),
    map((reference) => reference.data.content)
  );
  constructor(private translatorService: TranslatorService) {}

  ngOnInit(): void {}
}
