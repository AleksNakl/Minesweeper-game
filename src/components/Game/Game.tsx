import React from 'react';

import Header from '../Header/Header';

import classes from './Game.module.scss';

const Game: React.FC = () => (
  <div className={classes.mainPage}>
    <Header />
  </div>
);

export default Game;
