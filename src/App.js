import React, { useState, useEffect } from "react";
import { initializeBoard, moveTiles, checkGameOver } from "./gameLogic";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleMove = (direction) => {
    if (gameOver) return;

    const { board: newBoard, score: newScore } = moveTiles(board, direction, score);
    setBoard([...newBoard]);
    setScore(newScore);
    if (checkGameOver(newBoard)) setGameOver(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") handleMove("up");
    else if (event.key === "ArrowDown") handleMove("down");
    else if (event.key === "ArrowLeft") handleMove("left");
    else if (event.key === "ArrowRight") handleMove("right");
  };

  const restartGame = () => {
    setBoard(initializeBoard());
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, gameOver]);

  return (
    <div className="container">
      <h1>2048 Game</h1>
      <p>Score: {score}</p>
      {gameOver && <h2 className="game-over">Game Over! Press Restart</h2>}
      <button onClick={restartGame} className="restart-button">Restart</button>

      <div className="grid">
        {board.flat().map((tile, index) => (
          <motion.div
            key={index}
            className={`tile ${tile ? `tile-${tile}` : ""}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            {tile}
          </motion.div>
        ))}
      </div>

      {/* On-screen arrow buttons for mobile control */}
      <div className="controls">
        <button onClick={() => handleMove("up")} className="arrow up">↑</button>
        <div className="horizontal-buttons">
          <button onClick={() => handleMove("left")} className="arrow left">←</button>
          <button onClick={() => handleMove("right")} className="arrow right">→</button>
        </div>
        <button onClick={() => handleMove("down")} className="arrow down">↓</button>
      </div>
    </div>
  );
};

export default App;
