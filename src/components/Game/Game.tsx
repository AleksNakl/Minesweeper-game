import React from 'react';

import Board from '../Board/Board';
import Header from '../Header/Header';
import SetingsModal from '../SettingsModal/SettingsModal';
import GameModal from '../GameModal/GameModal';
import { useAppSelector } from '../../hooks';
import { getMinesweeperState } from '../../store/minesweeperSlice';

import classes from './Game.module.scss';

const Game: React.FC = () => {
  const { settingsModal, gameIndicator, gameModal } = useAppSelector(getMinesweeperState);
  return (
    <div className={classes.mainPage}>
      <Header />
      {settingsModal ? <SetingsModal /> : null}
      {gameIndicator === 'Game over' && gameModal ? <GameModal title="Game over" /> : null}
      {gameIndicator === 'Win' && gameModal ? <GameModal title="You Win!" /> : null}
      <div className={classes.interface}>
        <Board />
      </div>
    </div>
  );
};

export default Game;
