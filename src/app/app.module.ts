import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GameOfLifeModule } from 'game-of-life';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameOfLifeModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
