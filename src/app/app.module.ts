import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SourceLanguageModule } from './source-language/source-language.module';
import { DestinationLanguageModule } from './destination-language/destination-language.module';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './state/app.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SourceLanguageModule,
    DestinationLanguageModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
