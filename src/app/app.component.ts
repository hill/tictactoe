import { Component, OnInit, ViewChild, ViewChildren,  } from '@angular/core';
import { BoardComponent } from './board/board.component';

type WinState = 'X' | 'O' | null

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tictactoe';

  xIsNext: boolean;
  winner: WinState = null;
  boardWon: WinState[]
  activeBoards: number[];

  // @ViewChild(BoardComponent) board:BoardComponent
  @ViewChildren(BoardComponent) boards:BoardComponent[]

  ngOnInit(): void {
    this.newGame()
  }

  newGame() {
    this.xIsNext = true
    this.boardWon = Array(9).fill(null) // no board has been won
    this.activeBoards = [0,1,2,3,4,5,6,7,8]
    // this.board.newGame()
    this.boards.forEach(board => board.newGame() )
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  trackBoard(index: number, board: WinState) {
    return index;
  }

  handleTurn(boardIdx: number, squareIdx: number) {
    console.log(`${this.player} clicked board ${boardIdx} on square ${squareIdx}`)
    this.activeBoards = [squareIdx] // set the board the next player can go to
    if (this.boardWon[squareIdx] != null) {
      this.activeBoards = [0,1,2,3,4,5,6,7,8]
    }
    this.xIsNext = !this.xIsNext // change the player
  }

  handleBoardWon(boardIdx: number, winner: WinState) {
    console.log("handle board won:", boardIdx, winner)
    console.log(this.boardWon)
    // this.boardWon[boardIdx] = winner // NOTE: can not do this ... need to do a splice to update arrays
    this.boardWon.splice(boardIdx, 1, winner)
    console.log(this.boardWon)
    this.winner = this.calculateOverallWinner()
  }

  calculateOverallWinner(): WinState {
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
      const [a,b,c] = line
      if (
        this.boardWon[a] &&
        this.boardWon[a] === this.boardWon[b] &&
        this.boardWon[a] === this.boardWon[c]
      ) {
        return this.boardWon[a]
      }
    }
  }
}
