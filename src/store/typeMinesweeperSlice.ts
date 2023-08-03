export type TsettingsValue = {
  level: string;
  width: number;
  height: number;
  mins: number;
};

export type IinitialState = {
  gameIndicator: string;
  settingsValue: TsettingsValue;
};
