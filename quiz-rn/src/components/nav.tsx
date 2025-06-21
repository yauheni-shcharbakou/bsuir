import { FC } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { baseGlobalStyles, baseNavStyles } from '../styles';
import { observer } from 'mobx-react-lite';
import { NavProps } from '../abstractions/props';
import { useModal } from '../hooks';
import { ModalName } from '../shared/enums';

const Nav: FC<NavProps> = ({ globalStyles }) => {
  const { openModal } = useModal();

  return (
    <View style={baseNavStyles.container}>
      <Text style={[baseGlobalStyles.text, globalStyles.text]}>Quiz</Text>
      <Icon
        name="settings"
        color={globalStyles.text.color}
        onPress={openModal(ModalName.SETTINGS)}
      ></Icon>
    </View>
  );
};

export default observer(Nav);
