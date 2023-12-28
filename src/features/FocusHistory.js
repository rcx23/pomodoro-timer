import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {colors} from '../utils/colors.js';
import {fontSizes, spacing} from '../utils/sizes.js'

export const FocusHistory = ({history}) => {
  if (!history ||  !history.length) return (<View style={styles.container}><Text style={styles.title}>We haven't focused on anything yet</Text></View>)

  const renderItem = ({item}) => <Text style={styles.item}>- {item}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we've focused on:</Text>
      <FlatList 
        data={history}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding: spacing.md,
    flex:1
  },
  item:{
    color: colors.cream,
    fontSize: fontSizes.md,
    paddingTop: spacing.sm
  },
  title: {
    color: colors.cream,
    fontSize: fontSizes.md,
    fontWeight: 'bold'
  }
})