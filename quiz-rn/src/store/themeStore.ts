import { makeAutoObservable } from 'mobx';
import { OpacibleColorParams } from '../abstractions/common';
import { IThemeStore } from '../abstractions/interfaces';
import { localRepository } from '../repositories';

export default class ThemeStore implements IThemeStore {
  private isDarkValue = localRepository.getIsDark();
  private accentParamsValue: OpacibleColorParams = localRepository.getAccentParams();

  constructor() {
    makeAutoObservable(this);
  }

  get isDark(): boolean {
    return this.isDarkValue;
  }

  get accentParams(): OpacibleColorParams {
    return this.accentParamsValue;
  }

  getAccent(): string {
    return this.accentParamsValue.value;
  }

  getOpacedAccent(): string {
    return this.accentParamsValue.opacedValue;
  }

  setIsDark(isDark: boolean): void {
    this.isDarkValue = isDark;
  }

  setAccentParams(accentParams: OpacibleColorParams): void {
    this.accentParamsValue = accentParams;
  }
}
