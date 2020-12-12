import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() player: 'X' | 'O';
  @Input() locked: boolean;
  @Output() turnMade = new EventEmitter();
  @Output() boardHasWinner = new EventEmitter()
  squares: any[];
  winner: string;

  constructor() { }

  ngOnInit(): void {
    this.newGame()
  }

  trackItem(index: number, item: String) {

  }

  newGame() {
    this.squares = Array(9).fill(null)
    this.winner = null
  }

  makeMove(idx: number) {
    // if there is no winner and this board is not locked
    if (!this.winner && !this.locked) {
      // update the board state
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player)
        // let the overall game know a turn has been made
        this.turnMade.emit(idx)
      }
  
      // determine if there is a winner
      this.winner = this.calculateWinner()

      
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let line of lines) {
      const [a, b, c] = line
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.boardHasWinner.emit(this.squares[a])
        return this.squares[a]
      }
    }

    return null
  }

}
