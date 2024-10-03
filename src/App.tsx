import React, { useState } from 'react';
import GameLogic from './components/GameLogic';
import ScoreBoard from './components/ScoreBoard';
import { GameState } from './types';

// Appコンポーネント: アプリケーション全体の構造を定義
const App: React.FC = () => {
  // ゲームの状態を管理するstate
  const [gameState, setGameState] = useState<GameState>({
    playerHand: null,
    computerHand: null,
    instruction: null,
    result: null,
    score: { correct: 0, incorrect: 0 },
  });

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6">じゃんけん脳トレ</h1>
      {gameState.instruction && (
        <p className="text-xl text-center mb-4">
          指示: {gameState.instruction === 'win' ? '勝ってください！' :
                 gameState.instruction === 'lose' ? '負けてください！' :
                 '引き分けてください！'}
        </p>
      )}
      {gameState.computerHand && (
        <p className="text-xl text-center mb-4">
          コンピューター: {gameState.computerHand === 'rock' ? '✊' : gameState.computerHand === 'paper' ? '✋' : '✌️'}
        </p>
      )}
      <GameLogic onStateChange={setGameState} />
      <div className="h-16 flex items-center justify-center">
        {gameState.result && (
          <p className="text-2xl font-bold text-center">
            {gameState.result === 'correct' ? '正解！' : '不正解...'}
          </p>
        )}
      </div>
      <ScoreBoard score={gameState.score} />
    </div>
  );
};

export default App;
