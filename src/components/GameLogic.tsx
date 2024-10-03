import React, { useState, useCallback, useEffect } from 'react';
import { Hand, Instruction, Result, GameState } from '../types';

// じゃんけんの手の選択肢
const hands: Hand[] = ['rock', 'paper', 'scissors'];
// 指示の選択肢
const instructions: Instruction[] = ['win', 'lose', 'draw'];

// コンピューターの手をランダムに選択する関数
const getComputerHand = (): Hand => {
  const randomIndex = Math.floor(Math.random() * hands.length);
  return hands[randomIndex];
};

// プレイヤーへの指示をランダムに選択する関数
const getInstruction = (): Instruction => {
  const randomIndex = Math.floor(Math.random() * instructions.length);
  return instructions[randomIndex];
};

// プレイヤーの手が正しいかどうかを判定する関数
const getResult = (playerHand: Hand, computerHand: Hand, instruction: Instruction): Result => {
  // 実際の勝敗を判定
  const actualResult =
    playerHand === computerHand ? 'draw' :
    (playerHand === 'rock' && computerHand === 'scissors') ||
    (playerHand === 'paper' && computerHand === 'rock') ||
    (playerHand === 'scissors' && computerHand === 'paper') ? 'win' : 'lose';

  // 指示と実際の結果が一致すれば正解、そうでなければ不正解
  return actualResult === instruction ? 'correct' : 'incorrect';
};

// GameLogicコンポーネントのプロパティの型を定義
interface GameLogicProps {
  onStateChange: (newState: GameState) => void;
}

// GameLogicコンポーネント: ゲームのメインロジックを処理する
const GameLogic: React.FC<GameLogicProps> = ({ onStateChange }) => {
  // ゲームの状態を管理するstate
  const [gameState, setGameState] = useState<GameState>({
    playerHand: null,
    computerHand: getComputerHand(),  // 初期状態でコンピューターの手を設定
    instruction: getInstruction(),    // 初期状態で指示を設定
    result: null,
    score: { correct: 0, incorrect: 0 },
  });

  // 新しいラウンドを開始する関数
  const startNewRound = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      playerHand: null,
      computerHand: getComputerHand(),  // 新しいラウンドでコンピューターの手を再設定
      instruction: getInstruction(),    // 新しいラウンドで指示を再設定
      result: null,
    }));
  }, []);

  // プレイヤーが手を選んだときの処理
  const playHand = useCallback((hand: Hand) => {
    if (!gameState.instruction || gameState.result) return;

    // 結果を判定
    const result = getResult(hand, gameState.computerHand!, gameState.instruction);

    // ゲームの状態を更新
    setGameState((prevState) => ({
      ...prevState,
      playerHand: hand,
      result,
      score: {
        correct: prevState.score.correct + (result === 'correct' ? 1 : 0),
        incorrect: prevState.score.incorrect + (result === 'incorrect' ? 1 : 0),
      },
    }));

    // 2秒後に次のラウンドを開始
    setTimeout(startNewRound, 2000);
  }, [gameState.instruction, gameState.computerHand, gameState.result, startNewRound]);

  // 初回のラウンド開始
  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  // 状態が変更されたときに親コンポーネントに通知
  useEffect(() => {
    onStateChange(gameState);
  }, [gameState, onStateChange]);

  // じゃんけんの手を選択するボタンを表示
  return (
    <div className="flex justify-center">
      {hands.map((hand) => (
        <button
          key={hand}
          onClick={() => playHand(hand)}
          className="px-4 py-2 m-2 text-2xl bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {hand === 'rock' ? '✊' : hand === 'paper' ? '✋' : '✌️'} {hand === 'rock' ? 'グー' : hand === 'paper' ? 'パー' : 'チョキ'}
        </button>
      ))}
    </div>
  );
};

export default GameLogic;
