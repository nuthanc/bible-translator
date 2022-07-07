import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { debounceTime, map, switchMap } from 'rxjs';
import { TranslatorService } from '../common/translator.service';

@Component({
  selector: 'app-destination-language',
  templateUrl: './destination-language.component.html',
  styleUrls: ['./destination-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationLanguageComponent implements OnInit {
  content$ = this.translatorService.searchTextReady$.pipe(
    debounceTime(500),
    switchMap(() => this.translatorService.destLanguageText$),
    map((reference) => reference.data.content)
  );
  constructor(private translatorService: TranslatorService) {}

  ngOnInit(): void {}
}
