import React from 'react';

import { StyleSheet, Animated, Easing, Picker, Modal, Platform, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import glamorous, { View, TextInput } from 'glamorous-native'
import { Text, Bold } from '@constants/text'
import Colors from '@constants/colors'
import { toLongDate, toCurrency, Touchable, getStatusIcon, getStatusName } from '@helpers'
import { NavigationActions } from 'react-navigation'
import { TextInputMask } from 'react-native-masked-text'
import FormPicker from '@components/FormPicker'

import * as releasesActions from '@actions/releases'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Container = glamorous.scrollView({
  flex: 1,
  backgroundColor: 'white',
  padding: 10
})

const InputContainer = glamorous.view({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 10,
  marginBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f7f7f7'
})

let inputConfig = {
  flex: 1,
  paddingHorizontal: 10,
  marginLeft: 10,
  height: 35,
  alignItems: 'center',
  textAlign: 'right',
}

const Input = glamorous.textInput(inputConfig)
const InputPhone = glamorous(TextInputMask)(inputConfig)

const SaveButton = glamorous.touchableHighlight({
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: 10,
  backgroundColor: Colors.RED,
  borderColor: Colors.RED
}, (props) => ({
  backgroundColor: props.filled ? Colors.RED : '#fff',
}))

const mapStateToProps = state => ({
  isLoading: state.releases.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators(releasesActions, dispatch)

class EditReleaseScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.item.name,
  })

  state = {
    name: '',
    amount: 0,
    status: 0,
    phone_number: '',
    created_at: new Date().getTime(),
    buttonDisabled: false
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    this.setState({ ...this.props.navigation.state.params.item })
  }

  setVal(params) {
    this.setState({[params.field]: params.value})
  }

  saveRelease() {
    if (this.state.name && this.state.amount){
      this.props.save({
        name: this.state.name,
        amount: this.state.amount.replace(/\D/ig, ''),
        status: this.state.status,
        created_at: this.state.created_at
      })
  
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
        ]
      })
      
      this.props.navigation.dispatch(resetAction)    
    }  
  }

  render() {
    return (
      <Container>
        <View>
          <InputContainer>
            <Text>Nome</Text>
            <Input
              value={this.state.name}
              underlineColorAndroid='transparent'
              clearButtonMode='while-editing'
              placeholder="ex. Joao da esquina"
              onChangeText={name => this.setState({ name })}
            />
          </InputContainer>

          <InputContainer>
            <Text>Telefone</Text>
            <InputPhone
              type={'cel-phone'}
              value={this.state.phone_number}
              keyboardType='numeric'
              underlineColorAndroid='transparent'
              clearButtonMode='while-editing'
              placeholder="(XX) XXXX-XXX"
              onChangeText={phone_number => this.setState({ phone_number })}
            />
          </InputContainer>

          <InputContainer>
            <Text>Valor</Text>
            <Input
              value={toCurrency(String(this.state.amount).replace(/\D/ig, '')/100)}
              keyboardType='numeric'
              underlineColorAndroid='transparent'
              clearButtonMode='while-editing'
              onChangeText={amount => this.setState({ amount })}
            />
          </InputContainer>

          <InputContainer>
            <Text>Situação</Text>
            <FormPicker
              items={[{label: 'Aguardando Pagamento', value: 0}, {label: 'Pagamento Recebido', value: 1}]}
              value={this.state.status}
              onValueChange={status => this.setState({ status })}
            />
          </InputContainer>

          <SaveButton 
            filled 
            onPress={() => this.saveRelease() }
            disabled={this.state.buttonDisabled}
            >
            <View>
              <Text style={{ color: 'white', fontWeight: '600' }}>Adicionar Venda</Text>
            </View>
          </SaveButton>
        </View>

      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReleaseScreen)