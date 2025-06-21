import { MMKVInstance, MMKVLoader } from 'react-native-mmkv-storage';
import { OpacibleColorParams } from '../abstractions/common';
import {
  DEFAULT_ACCENT_COLOR,
  DEFAULT_IS_DARK,
  DEFAULT_OPACED_ACCENT_COLOR,
} from '../shared/constants';
import { StorageKey } from '../shared/enums';

export default class LocalRepository {
  private localStorage: MMKVInstance = new MMKVLoader()
    .withInstanceID('loshica.quiz.rn')
    .withEncryption()
    .initialize();

  getIsDark(): boolean {
    return this.localStorage.getBool(StorageKey.IS_DARK) || DEFAULT_IS_DARK;
  }

  saveIsDark(value: boolean) {
    this.localStorage.setBool(StorageKey.IS_DARK, value);
  }

  getAccentParams(): OpacibleColorParams {
    const value: string =
      this.localStorage.getString(StorageKey.ACCENT) || DEFAULT_ACCENT_COLOR;
    const opacedValue: string =
      this.localStorage.getString(StorageKey.OPACED_ACCENT) ||
      DEFAULT_OPACED_ACCENT_COLOR;

    return { value, opacedValue };
  }

  saveAccentParams(accentParams: OpacibleColorParams) {
    this.localStorage.setString(StorageKey.ACCENT, accentParams.value);
    this.localStorage.setString(StorageKey.OPACED_ACCENT, accentParams.opacedValue);
  }
}
