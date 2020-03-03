import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GameOfLifeModule } from 'game-of-life';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    GameOfLifeModule,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
