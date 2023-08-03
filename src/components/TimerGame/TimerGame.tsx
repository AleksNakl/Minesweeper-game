import React, { useState } from 'react';

import classes from './TimerGame.module.scss';

const TimerGame: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [timerData, setTimerData] = useState(0);

  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>TIME:</p>
      <p className={classes.TimerGame}>{timerData}</p>
    </div>
  );
};

export default TimerGame;
