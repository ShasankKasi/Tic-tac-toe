import { useState } from 'react';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import './board.css'
import Rules from './components/Rules';
import "./App.css"

function Square({value,onSquareClick}) {
  return (
    <button
  className="square"
  onClick={onSquareClick}
  style={{
    padding: '50px 50px',
    fontSize: '40px',
    width: '150px',  // Adjust as needed
    height: '150px', // Adjust as needed
  }}
>
  {value}
</button>

  );
}

export default function Board() {
  const [mode, setMode] = useState("light");
  const [xIsNext,setXIsNext]=useState(true);
  const [isTie, setIsTie] = useState(false); // Add a state variable to track ties

  const [squares, setSquares] = useState(Array(9).fill(null));
  // const[alert,setAlert]=useState(null);
  const restartGame = () => {
    setSquares(Array(9).fill(null)); // Reset squares to initial state
    setXIsNext(true); // Set player X to start the game
    setIsTie(false); // Reset tie state
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
      // Alert("Dark mode is on","success")

    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      // Alert("Light mode is on ","success")
    }
  };
  
  function handleClick(i) {
    if (calWinner(squares)) {
      setIsTie(false); // Reset tie state in case a winner is found
    } else if (!squares.includes(null)) {
      setIsTie(true); // Declare a tie if all squares are filled
      return; // Exit the function to prevent further moves after a tie
    }

    if (squares[i] || calWinner(squares) || isTie) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    setSquares(nextSquares);

    // Check for a tie after setting the new value
    if (!calWinner(nextSquares) && !nextSquares.includes(null)) {
      setIsTie(true); // Declare a tie if all squares are filled
      return; // Exit the function to prevent further moves after a tie
    }

    setXIsNext(!xIsNext);
  }
   const winner=calWinner(squares);
   let status;
  if (winner) {
    status = winner + " is the Winner 🎉\nCongratulations " + winner;
  } else if (isTie) {
    status = '   It\'s a tie !  Congratulations X  and  O '; // Display tie message
  } else {
    status = 'Game In Progress : Next Player is ' + (xIsNext ? 'X' : 'O');
  }
  return (
    <>
    <Navbar title="   TicTacToe   " mode={mode} toggleMode={toggleMode} />

    <div className="board" style={{
      position: 'absolute', top: '60%',left:'20%'
    }}>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
      </div>
      <br>
      </br>
      <Rules mode={mode}/>
      <div
        style={{
          position: "absolute",
          top:"130%",
          left: "36%",
          transform: "translateX(-50%)",
        }}
      >
        <button className="btn btn-primary" onClick={restartGame}>
          Restart Game
        </button>
      </div>
      <br/>
      <div className="board" style={{
      position: 'absolute', top: '50%',left:'15%'
    }}>

       <span className='status' style={{color:mode==='dark'?'white':'black',fontSize:'35px'}}><strong>{status}</strong></span>
    </div>
    <img
  src="https://c.shld.net/rpx/i/s/i/spin/-122/prod_2270797212??hei=64&wid=64&qlt=50"
  style={{
    position: 'absolute',
    top:'10%',
    left: '70%',
    height: '500px', // Set the height to half (32px) of the original size (64px)
    width: '500px', // Set the width to half (32px) of the original size (64px)
  }}
  alt="smaller_image"
/>


    </>
  );
}
function calWinner(squares)
{
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0;i<lines.length;i++)
  {
    const[a,b,c]=lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c])
    return squares[a];
  }
  return null;
}