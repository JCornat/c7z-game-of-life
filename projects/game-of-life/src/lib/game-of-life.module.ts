import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameOfLifeComponent } from './game-of-life.component';

@NgModule({
  declarations: [
    GameOfLifeComponent,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    GameOfLifeComponent,
  ],
})
export class GameOfLifeModule {
  //
}
