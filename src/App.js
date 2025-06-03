import React, { useState, useEffect } from "react";
import { initializeBoard, moveTiles, checkGameOver } from "./gameLogic";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (event) => {
    if (gameOver) return;

    let direction;
    if (event.key === "ArrowUp") direction = "up";
    else if (event.key === "ArrowDown") direction = "down";
    else if (event.key === "ArrowLeft") direction = "left";
    else if (event.key === "ArrowRight") direction = "right";

    if (direction) {
      const { board: newBoard, score: newScore } = moveTiles(board, direction, score);
      setBoard([...newBoard]);
      setScore(newScore);
      if (checkGameOver(newBoard)) setGameOver(true);
    }
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
          <motion.div key={index} className={`tile ${tile ? `tile-${tile}` : ""}`} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            {tile}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;
