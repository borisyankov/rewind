import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

// import {verifyInstallation} from 'nativewind';
// import './global.css';

function App(): React.JSX.Element {
  // verifyInstallation();

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.classic}>
          <Text>I am old-school</Text>
        </View>
        <View className="w-10 h-10 bg-blue-500">
          <Text>I am Nativewind!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  classic: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
  },
});

export default App;
