import React, { Component } from 'react'
import { Platform, StatusBar } from 'react-native'
import { AppLoading, Asset, Font } from 'expo'
import AppNavigation from '@navigators/AppNavigation'
import { Ionicons, EvilIcons } from '@expo/vector-icons'
import glamorous from 'glamorous-native'
import { Provider } from 'react-redux'
import configureStore from '@state/configureStore'
import Colors from '@constants/colors'
import 'intl'
import 'intl/locale-data/jsonp/pt'

const AppContainer = glamorous.view({
  flex: 1
})

const StatusBarUnderlay = glamorous.view({
  height: 24,
  backgroundColor: Colors.PRIMARY
})

const store = configureStore()

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  }

  _handleLoadingError = error => {
    console.warn(error);
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('@images/euanoto-mini.png')
      ]),

      Font.loadAsync({ ...EvilIcons.font, ...Ionicons.font }),
    ]);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }else {
      return (
        <Provider store={store}>
          <AppContainer>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" /> }
            {Platform.OS === 'android' && <StatusBarUnderlay background />}
            <AppNavigation />
          </AppContainer>
        </Provider>
      )
    }
  }
}