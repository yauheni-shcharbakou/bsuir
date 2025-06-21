import { ModalName } from '../shared/enums';
import { OpacibleColorParams } from './common';

export interface IThemeStore {
  isDark: boolean;
  accentParams: OpacibleColorParams;
  getAccent(): string;
  getOpacedAccent(): string;
  setIsDark(isDark: boolean): void;
  setAccentParams(accentParams: OpacibleColorParams): void;
}

export interface IModalStore {
  isOpened: boolean;
  toggle(): void;
  getName(): ModalName;
  setName(name: ModalName): void;
}
