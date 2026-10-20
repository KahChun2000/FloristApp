import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/theme';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FloristApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
});

export default App;
