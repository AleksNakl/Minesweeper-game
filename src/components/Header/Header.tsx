/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import Button from '../Button/Button';
import BombCount from '../BombCount/BombCount';
import TimerGame from '../TimerGame/TimerGame';

import classes from './Header.module.scss';

const Header: React.FC = () => {
  const onClickNewGame = () => {};
  const onClickSettings = () => {};

  return (
    <div className={classes.header}>
      <TimerGame />
      <Button text="New game" onClick={onClickNewGame} />
      <Button text="Settings" onClick={onClickSettings} />
      <BombCount />
    </div>
  );
};

export default Header;
