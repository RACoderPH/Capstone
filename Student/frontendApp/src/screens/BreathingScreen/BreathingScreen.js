import { Text, View } from 'react-native'
import { View, Text, StyleSheet } from 'react-native';

const CirclesWithText = () => {
  return (
    <View style={styles.container}>
      {/* First Circle */}
      <View style={styles.circle} />

      {/* Second Circle with Text */}
      <View style={styles.circle}>
        <Text style={styles.text}>Inhale</Text>
      </View>
    </View>
  );
};

export default BreathingScreen