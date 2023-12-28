import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import {ProgressBar} from 'react-native-paper';
import { Countdown } from '../components/Countdown.js';
import {useKeepAwake} from 'expo-keep-awake';
import { RoundedButton } from '../components/RoundedButton';
import {Timing} from './Timing.js';
import { spacing } from '../utils/sizes.js';
import { colors } from '../utils/colors.js';

const ONE_SECOND_IN_MS = 100;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN)
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar 
          progress={progress}
          color={colors.lightBrown}
          style={{height:spacing.sm}}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes}/>
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton size={100} title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton size={100} title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={50} title="-" onPress={clearSubject}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubjectWrapper:{
    flexDirection:'row',
    justifyContent: 'center'
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.cream,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.cream,
    textAlign: 'center',
  },
});
