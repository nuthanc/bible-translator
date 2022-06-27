import { Component, OnInit } from '@angular/core';
import { TranslatorService } from '../common/translator.service';

@Component({
  selector: 'app-source-language',
  templateUrl: './source-language.component.html',
  styleUrls: ['./source-language.component.scss'],
})
export class SourceLanguageComponent implements OnInit {
  srcText!: string;
  constructor(private translatorService: TranslatorService) {}

  ngOnInit(): void {}
  onInput(val: string) {
    this.srcText = val;
    this.translatorService.setSearchText(val);
  }
}
