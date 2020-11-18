import {StyleSheet, Dimensions, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get('window').height - StatusBar.currentHeight,
  },
});

export default styles;
