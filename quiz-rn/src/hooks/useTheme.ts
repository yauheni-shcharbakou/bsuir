import { useContext, useEffect, useState } from 'react';
import { OpacibleColorParams, SwithColorsParams } from '../abstractions/common';
import { IBtnStyles, IGlobalStyles, IModalStyles } from '../abstractions/styleInterfaces';
import { StoreContext } from '../store';
import {
  getDynamicButtonStyles,
  getDynamicGlobalStyles,
  getDynamicModalStyles,
} from '../styles';

export const useTheme = () => {
  const { themeStore } = useContext(StoreContext);

  const [btnStyles, setBtnStyles] = useState<IBtnStyles>(
    getDynamicButtonStyles(themeStore.getAccent())
  );

  const [modalStyles, setModalStyles] = useState<IModalStyles>(
    getDynamicModalStyles(themeStore.isDark)
  );

  const [globalStyles, setGlobalStyles] = useState<IGlobalStyles>(
    getDynamicGlobalStyles(themeStore.isDark)
  );

  useEffect(() => {
    setBtnStyles(() => getDynamicButtonStyles(themeStore.getAccent()));
    setModalStyles(() => getDynamicModalStyles(themeStore.isDark));
    setGlobalStyles(() => getDynamicGlobalStyles(themeStore.isDark));
  }, [themeStore.isDark, themeStore.accentParams]);

  const toggleTheme = (): void => themeStore.setIsDark(!themeStore.isDark);

  const changeAccentColor = (accentParams: OpacibleColorParams) => () => {
    themeStore.setAccentParams(accentParams);
  };

  const isCheckedAccent = (accent: string): boolean => accent === themeStore.getAccent();

  const getSwitchColors = (isChecked: boolean): SwithColorsParams => {
    const falseColor = '#767577';
    const trueColor: string = isChecked ? themeStore.getOpacedAccent() : falseColor;
    const thumbColor: string = isChecked ? themeStore.getAccent() : '#f4f3f4';

    return { falseColor, trueColor, thumbColor };
  };

  return {
    toggleTheme,
    changeAccentColor,
    isCheckedAccent,
    getSwitchColors,
    btnStyles,
    modalStyles,
    globalStyles,
  };
};
