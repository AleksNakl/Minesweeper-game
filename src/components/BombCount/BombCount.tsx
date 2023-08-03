import React from 'react';

import classes from './BombCount.module.scss';

const BombCount: React.FC = () => (
  <div className={classes.wrapper}>
    <div className={classes.icon} />
    <p className={classes.BombCount}>0</p>
  </div>
);

export default BombCount;
