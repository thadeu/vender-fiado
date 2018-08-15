import { Animated } from 'react-native'
import glamorous, { TouchableNativeFeedback, TouchableOpacity } from 'glamorous-native'
import { Touchable } from '@helpers'

const SIZE_BUTTON = 64

export const FabContainer = glamorous(Touchable)({
  zIndex: 9999,
})

export const Fab = glamorous(Animated.View)({
  backgroundColor: Colors.RED,
  height: SIZE_BUTTON,
  width: SIZE_BUTTON,
  borderRadius: SIZE_BUTTON / 2,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 5,
  position: 'absolute',
  bottom: 15,
  right: 15,
  elevation: 5,
  shadowOffset: { width: 2, height: 2 },
  shadowColor: '#666',
  shadowOpacity: 0.8,
  shadowRadius: 5,
})