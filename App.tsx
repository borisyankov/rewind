import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View as ReactNativeView,
} from 'react-native';
import {cssInterop, verifyInstallation} from 'nativewind';
import './global.css';

const View = cssInterop(ReactNativeView, {
  className: 'style',
});

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
