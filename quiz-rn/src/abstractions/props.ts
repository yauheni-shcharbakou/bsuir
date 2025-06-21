import { SwithColorsParams } from './common';
import { IBtnStyles, IGlobalStyles, IModalStyles } from './styleInterfaces';

type CommonButtonProps = {
  title: string;
  onPress: () => void;
};

export type AccentButtonProps = CommonButtonProps & {
  btnStyles: IBtnStyles;
};

export type ColoredButtonProps = CommonButtonProps & {
  color: string;
  isChecked: boolean;
};

export type NavProps = {
  globalStyles: IGlobalStyles;
};

export type DefaultSwitchProps = {
  title: string;
  isChecked: boolean;
  globalStyles: IGlobalStyles;
  getSwitchColors: (isChecked: boolean) => SwithColorsParams;
  onToggle: () => void;
};

export type ModalContainerProps = {
  modalStyles: IModalStyles;
};

export type DefaultModalProps = {
  onClose: () => void;
}
