import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ColoredButtonProps } from '../../abstractions/props';
import { baseColoredButtonStyles, getDynamicButtonStyles } from '../../styles';

const ColoredButton: FC<ColoredButtonProps> = ({ color, onPress, isChecked, title }) => {
  const dynamicStyles = getDynamicButtonStyles(color);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[baseColoredButtonStyles.btn, dynamicStyles.btn]}
    >
      <Text style={[baseColoredButtonStyles.text, dynamicStyles.text]}>
        {isChecked ? title : ''}
      </Text>
    </TouchableOpacity>
  );
};

export default ColoredButton;
