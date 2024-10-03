// じゃんけんの手を表す型
export type Hand = 'rock' | 'paper' | 'scissors';

// プレイヤーへの指示を表す型
export type Instruction = 'win' | 'lose' | 'draw';

// ゲームの結果を表す型
export type Result = 'correct' | 'incorrect';

// ゲームの状態を表すインターフェース
export interface GameState {
  playerHand: Hand | null;  // プレイヤーの選んだ手
  computerHand: Hand | null;  // コンピューターの手
  instruction: Instruction | null;  // 現在の指示
  result: Result | null;  // ゲームの結果
  score: {  // スコア
    correct: number;  // 正解数
    incorrect: number;  // 不正解数
  };
}
