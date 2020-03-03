import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameOfLifeComponent } from 'game-of-life';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  @ViewChild('gameOfLife') public gameOfLife: GameOfLifeComponent;

  public fieldWidth: number;
  public fieldHeight: number;
  public cellWidth: number;
  public myForm: FormGroup;
  public cellHeight: number;
  public play: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    //
  }

  public ngOnInit(): void {
    this.fieldWidth = 50;
    this.fieldHeight = 50;
    this.cellHeight = 10;
    this.cellWidth = 10;

    this.myForm = this.formBuilder.group({
      fieldWidth: this.fieldWidth,
      fieldHeight: this.fieldHeight,
      cellHeight: this.cellHeight,
      cellWidth: this.cellWidth,
    });

    this.myForm.valueChanges.subscribe(() => {
      this.fieldWidth = this.myForm.get('fieldWidth').value;
      this.fieldHeight = this.myForm.get('fieldHeight').value;
      this.cellHeight = this.myForm.get('cellHeight').value;
      this.cellWidth = this.myForm.get('cellWidth').value;
    });
  }

  public togglePlay(): void {
    this.gameOfLife.togglePlay();
  }

  public getNextStep(): void {
    this.gameOfLife.getNextStep();
  }

  public isPlaying(data: boolean): void {
    this.play = data;
  }
}
