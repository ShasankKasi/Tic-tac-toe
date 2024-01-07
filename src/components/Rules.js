import React from 'react';

export default function Rules(props) {
  return (
    <div className="Rules my-1" style={{color:props.mode==='dark'?'white':'black',left:"10%"}}>
      <h1><strong>Rules for Tic-Tac-Toe</strong></h1>
      <div className="list my-3" style={{
      position: 'absolute',left:'1%'
    }}>

      <ol style={{ padding: '0', listStylePosition: 'inside' }}>
        <li style={{ marginBottom: '15px' }}>
          The game is played on a grid that's 3 squares by 3 squares.
        </li>
        <li style={{ marginBottom: '10px' }}>
          You are X, your friend is O. Players take turns putting their marks in empty squares.
        </li>
        <li style={{ marginBottom: '10px' }}>
          The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.
        </li>
        <li style={{ marginBottom: '10px' }}>
          When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.
        </li>
      </ol>
      </div>
    </div>
  );
}
