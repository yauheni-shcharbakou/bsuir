import { IModalStore, IStyleStore, IThemeStore } from './interfaces';

export type ButtonParams = {
  title: string;
  value: string;
};

export type OpacibleColor = {
  r: number;
  g: number;
  b: number;
};

export type OpacibleColorParams = {
  value: string;
  opacedValue: string;
};

export type SwithColorsParams = {
  falseColor: string;
  trueColor: string;
  thumbColor: string;
};

export type AppStore = {
  themeStore: IThemeStore;
  modalStore: IModalStore;
};
