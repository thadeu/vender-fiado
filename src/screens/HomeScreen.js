import React from 'react'
import { Animated, Easing, Platform, Dimensions, Picker, Modal } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import glamorous, { View, Text } from 'glamorous-native'
import { Bold } from '@constants/text'
import Colors from '@constants/colors'
import { toLongDate, toLongDateTime, toCurrency, Touchable, getStatusIcon, getStatusName } from '@helpers'

import { Fab, FabContainer } from '@components/Fab'
import Loading from '@components/Loading'

import * as releasesActions from '@actions/releases'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const HEADER_MAX_HEIGHT = 150
const HEADER_MIN_HEIGHT = 0

const TotalView = glamorous(Animated.View)({
  backgroundColor: Colors.PRIMARY,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch'
})

const TextAnimated = glamorous(Animated.Text)({})

const PriceText = glamorous(TextAnimated)({
  fontSize: 48,
  fontWeight: 'bold',
  color: '#fff'
})

const LastUpdated = glamorous(TextAnimated)({
  color: '#fff'
})

const ListReleases = glamorous.flatList({
  flex: 1
})

const Status = glamorous.text({
  marginHorizontal: 4
}, (props) => ({
  color: props.paid ? '#32cd32' : '#f00'
}))

const Item = ({ item, navigation }) => {
  return (
    <Touchable 
      onLongPress={() => <Modal />}
      onPress={() => navigation.navigate('EditRelease', { item })}>

      <View 
        paddingHorizontal={20}
        paddingVertical={20}
        borderBottomWidth={1}
        borderBottomColor={"#eee"}
        flexDirection='row'
      >
        <View flex={1}>
          <View 
            flexDirection='row' 
            justifyContent='flex-start' 
            alignItems='center' 
            style={{ paddingBottom: 10 }}
          >
            <Feather name="user"/>
            
            <Text 
              marginHorizontal={4} 
              numberOfLines={1} 
              ellipsizeMode="tail">
              {item.name}
            </Text>

            <Status paid={item.status == 1}>
              {getStatusIcon(item)} {getStatusName(item)}
            </Status>
          </View>
          
          <View flexDirection='row' justifyContent='flex-start' alignItems='center'>
            <Text>{toCurrency(item.amount/100)}</Text>
            
            <View flexDirection='row' alignItems='center' style={{ paddingLeft: 10 }}>
              <Feather name="calendar" />
              <Text>{` ${toLongDateTime(item.created_at)} `}</Text>
            </View>
          </View>
        </View>
      </View>
    </Touchable>
  )
}

const mapStateToProps = state => ({  
  releases: state.releases.data,
  isLoading: state.releases.isLoading,
})

const mapDispatchToProps = dispatch => bindActionCreators(releasesActions, dispatch)

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Vender Fiado'
  })

  state = {
    scrollY: new Animated.Value(0),
  }

  constructor(props) {
    super(props)
  }

  renderHeader = () => {
    const opacityAnim = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    const scale = this.state.scrollY.interpolate({
      inputRange: [0, 150, 320],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    })

    let sum = this.props.releases.reduce( ( prevVal, elem ) => prevVal + Number(elem.amount), 0 ); 
    const lastItem = [...this.props.releases].pop();

    return (
      <TotalView style={{ 
        zIndex: 9999,
        height: HEADER_MAX_HEIGHT,
        transform: [{scaleY: scale }]
      }}>
        <PriceText style={{ opacity: opacityAnim }}>{toCurrency(sum/100)}</PriceText>
        
        <LastUpdated style={{ opacity: opacityAnim }}>
          Última atualização em {toLongDate(lastItem.created_at)}
        </LastUpdated>
      </TotalView>
    )
  }

  renderListOrBlank() {
    if (this.props.releases.length <= 0){
      return (
        <View justifyContent='center' alignItems='center' flex={1} paddingHorizontal={30}>
          <Feather name="bell" size={130} />
          <Text paddingVertical={20} fontSize={26} fontWeight='bold'>Nenhum item encontrado</Text>
          <Text textAlign='center' fontSize={19} flexWrap='wrap'>Você ainda não fez nenhuma venda fiado.</Text>
        </View>
      )
    }

    return (
      <ListReleases
        keyExtractor={(item, index) => index}
        data={this.props.releases}
        ListHeaderComponent={this.renderHeader}
        renderItem={({item}) => <Item item={item} navigation={this.props.navigation} />}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
        )}
      />
    )
  }

  render() {
    let { fadeIn } = this.state;

    if (this.props.isLoading) return <Loading />

    return (
      <View flex={1} backgroundColor={"#fff"}>
        {this.renderListOrBlank()}

        <FabContainer onPress={() => this.props.navigation.navigate('AddRelease')}>
          <Fab>
            <Feather 
              name="plus" 
              size={32} 
              color={"#fff"}  
            />
          </Fab>
        </FabContainer>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)