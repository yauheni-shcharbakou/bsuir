import { StyleSheet, Dimensions } from 'react-native';

export const baseGlobalStyles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    justifyContent: 'space-between',
  },
  bottomBlock: {
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    fontSize: 32,
  },
});

export const getDynamicGlobalStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark ? '#000' : '#eee',
    },
    text: {
      color: isDark ? '#fff' : '#000',
    },
  });
