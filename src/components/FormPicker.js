import React from 'react';
import { Picker, Modal, Platform, TouchableWithoutFeedback } from 'react-native';
import glamorous, { View, TextInput } from 'glamorous-native'
import { Text } from '@constants/text'
import { Touchable } from '@helpers'

export default class FormPicker extends React.Component {

  state = {
    modalVisible: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <Picker
          style={{
            flex: 1,
            paddingVertical: 20,
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
          prompt="Selecione um item"
          selectedValue={this.props.value}
          onValueChange={this.props.onValueChange}>
          {this.props.items.map((i, index) => (
            <Picker.Item
              underlineColorAndroid='transparent'
              key={index}
              label={i.label}
              value={i.value}
            />
          ))}
        </Picker>
      );
    } else {
      const selectedItem = this.props.items.find(i => i.value === this.props.value);
      const selectedLabel = selectedItem ? selectedItem.label : '';

      return (
        <View>
          <Touchable onPress={() => this.setState({ modalVisible: true })}>
            <View flex={1}>
              <Text style={{
                flex: 1,
                paddingVertical: 20,
                marginLeft: 10,
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'right'
              }}>{selectedLabel}</Text>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}>

              <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: false })}>
                <View style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                  <View style={{
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#ececec'
                  }}>
                    <Text
                      style={{ color: 'blue', borderWidth: 1, borderColor: 'blue', padding: 5, borderRadius: 5 }}
                      onPress={() => this.setState({ modalVisible: false })}>
                      Selecione
                    </Text>
                  </View>

                  <View style={{ backgroundColor: 'white' }}>
                    <Picker
                      selectedValue={this.props.value}
                      onValueChange={this.props.onValueChange}>
                      {this.props.items.map((i, index) => (
                        <Picker.Item
                          key={index}
                          label={i.label}
                          value={i.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

              </TouchableWithoutFeedback>
            </Modal>
          </Touchable>
        </View>
      );
    }
  }
}