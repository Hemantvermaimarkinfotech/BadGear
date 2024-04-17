import {StyleSheet, Text, View} from 'react-native';
import Provider from './src/Components/Provider';
const App = () => {
  return (
    <View style={styles.container}>
      <Provider />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});