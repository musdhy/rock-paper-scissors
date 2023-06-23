import React, { useState, useEffect } from "react";
import './Game.css';
import Rock from "../../assets/images/icon-rock.svg";
import Paper from "../../assets/images/icon-paper.svg";
import Scissors from "../../assets/images/icon-scissors.svg";
import Triangle from "../../assets/images/bg-triangle.svg";

const Game = () => {
  let choices = [
    { name: "Rock", image: Rock, class: "rock" },
    { name: "Paper", image: Paper, class: "paper" },
    { name: "Scissors", image: Scissors, class: "scissors" },
  ];

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [result, setResult] = useState(null);

  const handleComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };
  useEffect(() => {
    if (playerChoice && computerChoice) {
      if (
        (playerChoice.name === "Rock" && computerChoice.name === "Scissors") ||
        (playerChoice.name === "Paper" && computerChoice.name === "Rock") ||
        (playerChoice.name === "Scissors" && computerChoice.name === "Paper")
      ) {
        setResult("You win!");
        setPlayerScore(playerScore + 1);
      } else if (playerChoice.name === computerChoice.name) {
        setResult("It's a tie!");
      } else {
        setResult("You lose!");
        setComputerScore(computerScore + 1);
      }
    }
  }, [playerChoice, computerChoice]);

  const handleReset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };
  return (
    <div className="app">
      <div className="score__board">
        <div className="header">
          <span>Rock</span>
          <span>paper</span>
          <span>Scissors</span>
        </div>
        <div className="scores">
          <p>
            Player <span id="player-score">{playerScore}</span>
          </p>
          <p>
            Computer <span id="computer-score">{computerScore}</span>
          </p>
        </div>
      </div>
      <div className="main">
        {result ? (
          <div className="player">
            {playerChoice && (
              <>
                <div className="pChoice">
                  <p>You chose:</p>
                  <img
                    src={playerChoice.image}
                    alt={playerChoice.name}
                    className={playerChoice.class}
                    style={
                      playerChoice.class === "rock"
                        ? { border: "15px solid hsl(349, 71%, 52%)" }
                        : playerChoice.class === "paper"
                        ? { border: "15px solid hsl(230, 89%, 62%)" }
                        : playerChoice.class === "scissors"
                        ? { border: "15px solid hsl(39, 89%, 49%)" }
                        : {}
                    }
                  />
                </div>
                <div className="result">
                  <p>{result}</p>
                  <button onClick={handleReset}>Play Again</button>
                </div>
                <div className="cChoice">
                  <p>computer chose:</p>
                  <img
                    src={computerChoice.image}
                    alt={computerChoice.name}
                    className={computerChoice.class}
                    style={
                      computerChoice.class === "rock"
                        ? { border: "15px solid hsl(349, 71%, 52%)" }
                        : computerChoice.class === "paper"
                        ? { border: "15px solid hsl(230, 89%, 62%)" }
                        : computerChoice.class === "scissors"
                        ? { border: "15px solid hsl(39, 89%, 49%)" }
                        : {}
                    }
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {choices.map((choice) => (
              <button
                key={choice.name}
                className={choice.class}
                onClick={() => {
                  setPlayerChoice(choice);
                  handleComputerChoice();
                }}
              >
                <img src={choice.image} alt={choice.name} />
              </button>
            ))}
            <div className="triangle">
              <img src={Triangle} alt="" />
            </div>
          </>
        )}
      </div>
      {/* {result && (
      <div className="result">
        <p>{result}</p>
        <button onClick={() => setResult(null)}>Play again</button>
      </div>
    )} */}
    </div>
  );
};

export default Game;
