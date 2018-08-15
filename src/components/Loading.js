import React, { Component } from 'react'
import { Text, View, Platform, ActivityIndicator } from 'react-native'
import Colors from '@constants/colors'

const Loading = props => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.PRIMARY
      }}>
      <ActivityIndicator animating size="large" />
    </View>
  )
}

export default Loading