import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {
  board = [ [], [], [] ];

  state = {
            started: false,
            gameOver: false, 
            board: this.board, 
            player1: { name: '', piece: 'X', wins: 0 }, 
            player2: { name: '', piece: 'O', wins: 0 },
            ties: 0,
            turn: 0
          };

  winLogic(arr) {
    if(arr.length)
      if( (arr[0] === arr[1]) && (arr[1] === arr[2])) {
        // TODO: figure out who won and set the wins state of that player
        this.setState({ gameOver: true });
      }
  }

  checkWin() {
    let { board } = this.state;
    // only checking row wins right now
    this.winLogic(board[0])
    this.winLogic(board[1])
    this.winLogic(board[2])

    // TODO: figure out how to check col wins and dig wins and check for ties
  }

  placePiece = (row, index) => {
    let { turn, player1, player2, board, gameOver } = this.state;
    // TODO: don't allow this to happen if the row at index has a value already
    if(!gameOver) {
      let piece, newTurn;

      if(turn === 0) {
        piece = player1.piece;
        newTurn = 1;
      } else {
        piece = player2.piece;
        newTurn = 0;
      }
      board[row][index] = piece;
      this.setState({ board, turn: newTurn });
      this.checkWin();
    }
  }

  resetGame = () => {
    this.setState({ gameOver: false, board: [[], [], []], turn: 0 });
  }

  boardDisplay() {
    // TODO: figure out how to clean this up by doing a loop instead
    return(
      <div>
        { this.state.gameOver && <button className='btn' onClick={this.resetGame}>New Game?</button> }
        <div className='row'>
          {/*first row*/}
          <div onClick={() => this.placePiece(0,0)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[0][0] } />
          </div>
          <div onClick={() => this.placePiece(0, 1)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[0][1] } />
          </div>
          <div onClick={() => this.placePiece(0, 2)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[0][2] } />
          </div>

          {/*second row*/}
          <div onClick={() => this.placePiece(1, 0)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[1][0] } />
          </div>
          <div onClick={() => this.placePiece(1, 1)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[1][1] } />
          </div>
          <div onClick={() => this.placePiece(1, 2)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[1][2] } />
          </div>

          {/*third row*/}
          <div onClick={() => this.placePiece(2, 0)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[2][0] } />
          </div>
          <div onClick={() => this.placePiece(2, 1)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[2][1] } />
          </div>
          <div onClick={() => this.placePiece(2, 2)} className='col s4' style={{width: '33.3%', height: '250px', border: '1px solid black'}}>
            <Cell piece={ this.state.board[2][2] } />
          </div>
        </div>
      </div>
    )
  }

  playersDisplay() {
    return(
      <form>
        <label>Player 1 Name:</label>
        <input 
          autoFocus
          type='text'
          onChange={ (e) => this.setName(e, 'player1') }
          required 
          value={this.state.player1.name}
        />
        <label>Player 2 Name:</label>
        <input 
          type='text' 
          onChange={ (e) => this.setName(e, 'player2') }
          required 
          value={this.state.player2.name}
        />
        { this.startGameButton() }
      </form>
    );
  }

  startGameButton() {
    let { player1, player2 } = this.state;
    if(player1.name && player2.name)
      return(
        <div className='center'>
          <button type='button' className='btn' onClick={this.startGame}>
            Play Game!
          </button>
        </div>
      );
  }

  setName(e, player) {
    let playerState = this.state[player];
    this.setState({ [player]: { ...playerState, name: e.target.value } })
  }

  startGame = () => {
    this.setState({ started: true });
  }

  render() {
    return(
      <div>
        <h1 className='center'>React Tic Tac Toe</h1>
        {/* TODO: display what player name is taking their turn */}
        <hr />
        { this.state.started ? this.boardDisplay() : this.playersDisplay() }
      </div>
    )
  }
}

export default Board;