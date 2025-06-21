import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AccentButtonProps } from '../../abstractions/props';
import { baseAccentButtonStyles } from '../../styles';

const AccentButton: FC<AccentButtonProps> = ({ btnStyles, onPress, title }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[baseAccentButtonStyles.btn, btnStyles.btn]}
    >
      <Text style={[baseAccentButtonStyles.text, btnStyles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AccentButton;
