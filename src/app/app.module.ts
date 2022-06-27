import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SourceLanguageComponent } from './source-language/source-language.component';
import { DestinationLanguageComponent } from './destination-language/destination-language.component';

@NgModule({
  declarations: [
    AppComponent,
    SourceLanguageComponent,
    DestinationLanguageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
