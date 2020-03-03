import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'c7z-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss'],
})
export class GameOfLifeComponent implements OnInit {
  @ViewChild('canvas') set canvas(data: any) {
    if (!data) {
      return;
    }

    if (this._canvas) {
      return;
    }

    this._canvas = data;
    console.log('init', data);
    this.init();
  }

  @Input('cellWidth') set cellWidth(data: number) {
    this._cellWidth = data;
    console.log('init1', data);
    this.init();
  }

  @Input('cellHeight') set cellHeight(data: number) {
    this._cellHeight = data;
    console.log('init2', data);
    this.init();
  }

  @Input('fieldWidth') set fieldWidth(data: number) {
    this._fieldWidth = data;
    console.log('init3', data);
    this.init();
  }

  @Input('fieldHeight') set fieldHeight(data: number) {
    this._fieldHeight = data;
    console.log('init4', data);
    this.init();
  }

  public grid: boolean[][];

  public _canvas: any;
  public context: any;

  public _fieldWidth: number;
  public _fieldHeight: number;
  public _cellWidth: number;
  public _cellHeight: number;

  public isPlaying: boolean;
  public nextStep: boolean;

  public animationFrameId: number;
  public mousePosition: { x: number, y: number };

  constructor() {
    this.initializeDefaultVariables();
  }

  public initializeDefaultVariables(): void {
    console.log('ngOnInit');
    this._fieldWidth = 10;
    this._fieldHeight = 10;
    this._cellHeight = 40;
    this._cellWidth = 40;
  }

  public ngOnInit(): void {
    //
  }

  public check(): void {

  }

  public togglePlay(): void {
    this.isPlaying = !this.isPlaying;

    if (!this.isPlaying) {
      cancelAnimationFrame(this.animationFrameId);
    } else {
      this.gameLoop();
    }
  }

  public getNextStep(): void {
    this.nextStep = true;
    this.gameLoop();
  }

  public init(): void {
    if (!this._canvas) {
      return;
    }

    console.log('initx');
    this.resizeCanvas();
    this.initializeGame();
  }

  public resizeCanvas(): void {
    this._canvas.nativeElement.width = this._fieldWidth * this._cellWidth;
    this._canvas.nativeElement.height = this._fieldHeight * this._cellHeight;
  }

  public initializeGrid(): boolean[][] {
    const grid = [];
    for (let i = 0; i < this._fieldHeight; i++) {
      const row = [];
      for (let j = 0; j < this._fieldWidth; j++) {
        row.push(false);
      }

      grid.push(row);
    }

    return grid;
  }

  public initializeGame(): void {
    this.grid = this.initializeGrid();
    this.context = this._canvas.nativeElement.getContext('2d');

    this._canvas.nativeElement.onmousemove = this.getMousePosition.bind(this);
    this._canvas.nativeElement.onclick = this.clickCell.bind(this);
  }

  public getMousePosition(event): void {
    const rect = this._canvas.nativeElement.getBoundingClientRect();
    this.mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  public clickCell(event): void {
    const rect = this._canvas.nativeElement.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const position = this.getCellByPoint(point, this.grid);
    this.grid[position.x][position.y] = !this.grid[position.x][position.y];
    this.draw();
  }

  public gameLoop(): void {
    this.generateNextGeneration();
    this.draw();

    if (this.nextStep) {
      this.nextStep = false;
      return;
    }

    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  public draw(): void {
    console.log('draw');
    this.context.clearRect(0, 0, 300, 300);

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const cell = this.grid[i][j];

        if (cell) {
          this.context.fillStyle = '#e0e0e0';
        } else {
          this.context.fillStyle = '#ff1744';
        }

        this.context.fillRect(i * this._cellWidth, j * this._cellHeight, this._cellWidth, this._cellHeight);
      }
    }
  }

  public getCellByPoint(point: { x: number, y: number }, field: any[][]): { x: number, y: number } {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        const isInside = this.isPointInsideRectangle(point, {x: i * this._cellWidth, y: j * this._cellHeight, width: this._cellWidth, height: this._cellHeight});
        if (isInside) {
          return {x: i, y: j};
        }
      }
    }
  }

  public isPointInsideRectangle(point: { x: number, y: number }, rectangle: { x: number, y: number, width: number, height: number }): boolean {
    let res = true;

    if (
      point.x <= rectangle.x ||
      point.x > rectangle.x + rectangle.width ||
      point.y <= rectangle.y ||
      point.y > rectangle.y + rectangle.height
    ) {
      res = false;
    }

    return res;
  }

  public countAdjacentCell(position: {x: number, y: number}): number {
    let res = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        const xPosition = position.x + i;
        if (xPosition < 0 || xPosition > this._fieldWidth - 1) {
          continue;
        }

        const yPosition = position.y + j;
        if (yPosition < 0 || yPosition > this._fieldHeight - 1) {
          continue;
        }

        const status = this.grid[xPosition][yPosition];
        if (status) {
          res++;
        }
      }
    }

    return res;
  }

  public generateNextGeneration(): void {
    const grid = this.initializeGrid();

    for (let i = 0; i < this._fieldHeight; i++) {
      for (let j = 0; j < this._fieldWidth; j++) {
        let nextStatus = false;
        const status = this.grid[i][j];
        const neighbors = this.countAdjacentCell({x: i, y: j});
        if (status) {
          if (neighbors === 2 || neighbors === 3) {
            nextStatus = true;
          }
        } else {
          if (neighbors === 3) {
            nextStatus = true;
          }
        }

        grid[i][j] = nextStatus;
      }
    }

    this.grid = grid;
  }
}
