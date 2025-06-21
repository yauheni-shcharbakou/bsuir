import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import AccentButton from './src/components/buttons/accentButton';
import Layout from './src/components/layout';
import ModalContainer from './src/components/modalContainer';
import { useTheme } from './src/hooks';
import { baseGlobalStyles } from './src/styles';

function App() {
  const { btnStyles } = useTheme();

  return (
    <Layout>
      <View style={baseGlobalStyles.bottomBlock}>
        <AccentButton btnStyles={btnStyles} title="Play" onPress={() => {}} />
        <AccentButton btnStyles={btnStyles} title="Leaderboard" onPress={() => {}} />
      </View>
      <ModalContainer />
    </Layout>
  );
}

export default observer(App);
