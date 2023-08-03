import React from 'react';

import Header from '../Header/Header';
import Board from '../Board/Board';

import classes from './Game.module.scss';

const Game: React.FC = () => (
  <div className={classes.mainPage}>
    <Header />
    <div className={classes.interface}>
      <Board />
    </div>
  </div>
);

export default Game;
