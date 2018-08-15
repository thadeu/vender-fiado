import React from 'react';
import { Animated, Easing, Platform } from 'react-native'
import StackNavigators from '@helpers/StackNavigators'
import { Ionicons, EvilIcons } from '@expo/vector-icons'
import Expo from 'expo'
import Colors from '@constants/colors'

import HomeScreen from '@screens/HomeScreen'
import AddReleaseScreen from '@screens/AddReleaseScreen'
import EditReleaseScreen from '@screens/EditReleaseScreen'

const Icon = ({ name, tintColor }) => <EvilIcons name={name} size={35} style={{ color: tintColor }} />

const StackNavigatorConfig = {
  // headerMode: 'none',
  // mode: Platform.OS === 'ios' ? 'modal' : 'card',
  navigationOptions: ({ navigation }) => ({
    title: `${navigation.state.title}`,
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      color: '#ffffff'
    },
    headerStyle: {
      backgroundColor: Colors.PRIMARY,
      borderBottomColor: Colors.PRIMARY,
      borderBottomWidth: 0,
    },
    headerBackTitleStyle: {
      color: '#ffffff'
    },
    gesturesEnabled: true
  }),
  transitionConfig: () => ({
    transitionSpec: {
      duration: Platform.OS == 'android' ? 700 : 350 ,
      easing: Easing.inOut(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const thisSceneIndex = scene.index
      const { index } = scene

      const height = layout.initHeight
      const width = layout.initWidth

      let thisSceneParams = scene.route.params || {}
      let { screenMode } = thisSceneParams

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      })

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      })

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      })

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [1, 1, 2]
      })

      const slideFromRight = { transform: [{ translateX }] }
      const slideInFromBottom = { transform: [{ translateY }] }
      const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }

      if (screenMode && screenMode == 'slideFromRight') return slideFromRight
      if (screenMode && screenMode == 'slideInFromBottom') return slideInFromBottom
      
      return Platform.OS === 'ios' ? slideFromRight : scaleWithOpacity
    },
  }),
}

const AppNavigation = StackNavigators({
  Home: {
    screen: HomeScreen,
  },
  AddRelease: {
    screen: AddReleaseScreen,
  },
  EditRelease: {
    screen: EditReleaseScreen,
  },
}, StackNavigatorConfig)


export default AppNavigation