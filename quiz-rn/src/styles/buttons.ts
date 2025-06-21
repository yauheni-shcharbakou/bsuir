import { StyleSheet, Dimensions } from 'react-native';

const coloredButtonsContainerWidth: number = Dimensions.get('window').width - 20;
const coloredButtonsSize: number = coloredButtonsContainerWidth / 6 - 20;

const btnCommonStyles = {
  marginHorizontal: 10,
  padding: 10,
  borderWidth: 5,
  borderColor: 'transparent',
};

const btnTextCommonStyles: any = {
  textAlign: 'center',
  fontWeight: '700',
  textTransform: 'uppercase',
};

export const baseAccentButtonStyles = StyleSheet.create({
  btn: {
    ...btnCommonStyles,
    marginVertical: 5,
    borderRadius: 20,
  },
  text: {
    ...btnTextCommonStyles,
    fontSize: 24,
  },
});

export const baseColoredButtonStyles = StyleSheet.create({
  btn: {
    ...btnCommonStyles,
    width: coloredButtonsSize,
    height: coloredButtonsSize,
    borderRadius: coloredButtonsSize / 2,
    marginVertical: 10,
  },
  text: {
    ...btnTextCommonStyles,
    fontSize: coloredButtonsSize / 4,
  },
});

export const getDynamicButtonStyles = (color: string) =>
  StyleSheet.create({
    btn: {
      backgroundColor: color,
    },
    text: {
      color: color === 'white' ? '#000' : '#fff',
    },
  });
