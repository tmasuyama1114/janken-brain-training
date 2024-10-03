import React from 'react';
import { Hand } from '../types';

interface HandButtonProps {
  hand: Hand;
  onClick: (hand: Hand) => void;
}

const HandButton: React.FC<HandButtonProps> = ({ hand, onClick }) => {
  const emoji = hand === 'rock' ? '✊' : hand === 'paper' ? '✋' : '✌️';
  const label = hand === 'rock' ? 'グー' : hand === 'paper' ? 'パー' : 'チョキ';

  return (
    <button
      onClick={() => onClick(hand)}
      className="px-4 py-2 m-2 text-2xl bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {emoji} {label}
    </button>
  );
};

export default HandButton;
