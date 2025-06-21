import { FC } from 'react';
import { Switch, Text, Pressable } from 'react-native';
import { DefaultSwitchProps } from '../abstractions/props';
import { baseSwitchStyles } from '../styles';

const DefaultSwitch: FC<DefaultSwitchProps> = ({
  title,
  isChecked,
  globalStyles,
  getSwitchColors,
  onToggle,
}) => {
  const { thumbColor, trueColor, falseColor } = getSwitchColors(isChecked);

  return (
    <Pressable style={baseSwitchStyles.container} onPress={onToggle}>
      <Text style={[globalStyles.text, baseSwitchStyles.text]}>{title}</Text>
      <Switch
        trackColor={{ false: falseColor, true: trueColor }}
        thumbColor={thumbColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={isChecked}
      />
    </Pressable>
  );
};

export default DefaultSwitch;
