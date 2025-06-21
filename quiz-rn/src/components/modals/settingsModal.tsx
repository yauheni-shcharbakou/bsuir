import { observer } from 'mobx-react-lite';
import { FC, useContext } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../hooks';
import { DefaultModalProps } from '../../abstractions/props';
import { ACCENT_COLORS_PARAMS } from '../../shared/constants';
import { StoreContext } from '../../store';
import ColoredButton from '../buttons/coloredButton';
import DefaultSwitch from '../defaultSwitch';
import { baseModalStyles } from '../../styles';
import AccentButton from '../buttons/accentButton';

const SettingsModal: FC<DefaultModalProps> = ({ onClose }) => {
  const {
    changeAccentColor,
    isCheckedAccent,
    toggleTheme,
    getSwitchColors,
    globalStyles,
    btnStyles,
  } = useTheme();
  const { themeStore } = useContext(StoreContext);

  return (
    <>
      <Text style={[globalStyles.text, baseModalStyles.headerText]}>Settings</Text>

      <View style={baseModalStyles.wrapContainer}>
        {ACCENT_COLORS_PARAMS.map(({ value, opacedValue }) => (
          <ColoredButton
            key={value}
            title={'✓'}
            onPress={changeAccentColor({ value, opacedValue })}
            color={value}
            isChecked={isCheckedAccent(value)}
          />
        ))}
      </View>

      <DefaultSwitch
        title="Dark mode"
        isChecked={themeStore.isDark}
        globalStyles={globalStyles}
        getSwitchColors={getSwitchColors}
        onToggle={toggleTheme}
      />

      <AccentButton title="Close" onPress={onClose} btnStyles={btnStyles} />
    </>
  );
};

export default observer(SettingsModal);
