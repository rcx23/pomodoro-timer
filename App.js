import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { colors } from './src/utils/colors.js';
import { spacing, fontSizes } from './src/utils/sizes.js';
import { Focus } from './src/features/Focus.js';
import { Timer } from './src/features/Timer.js';
import { FocusHistory } from './src/features/FocusHistory.js';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Cybersec Cafe</Text>
        <Text style={styles.subtitleText}> Pomodoro Timer</Text>
      </View>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory([...history, subject]);
          }}
          clearSubject={() => {
            setCurrentSubject(null);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.brown,
  },
  titleContainer: {
    flex:.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText:{
    color: colors.cream,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.xl
  },
  subtitleText:{
    color: colors.cream,
    textAlign: 'center',
    fontSize: fontSizes.md
  }
});
