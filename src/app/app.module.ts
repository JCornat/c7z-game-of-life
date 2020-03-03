import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameOfLifeModule } from '../../projects/game-of-life/src/lib/game-of-life.module';

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
