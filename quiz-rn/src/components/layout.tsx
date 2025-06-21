import React, { FC } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { useTheme } from '../hooks';
import { store, StoreContext } from '../store';
import { baseGlobalStyles } from '../styles';
import Nav from './nav';

const Layout: FC = ({ children }) => {
  const { globalStyles } = useTheme();

  return (
    <SafeAreaView>
      <StoreContext.Provider value={store}>
        <StatusBar barStyle="light-content" animated={true} backgroundColor="#000" />
        <View style={[baseGlobalStyles.container, globalStyles.container]}>
          <Nav globalStyles={globalStyles} />
          {children}
        </View>
      </StoreContext.Provider>
    </SafeAreaView>
  );
};

export default Layout;
