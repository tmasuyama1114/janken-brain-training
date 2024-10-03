import React from 'react';
import { GameState } from '../types';

// ScoreBoardコンポーネントのプロパティの型を定義
interface ScoreBoardProps {
  score: GameState['score'];
}

// ScoreBoardコンポーネント: 現在のスコアを表示する
const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="mt-4 text-xl">
      <p>正解: {score.correct}</p>
      <p>不正解: {score.incorrect}</p>
    </div>
  );
};

export default ScoreBoard;
