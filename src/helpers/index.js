import React from 'react'
import { Platform, Dimensions } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'glamorous-native'
import { Ionicons, Feather } from '@expo/vector-icons'

export const toLongDate = timestamp => {
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('pt-BR', options).format(timestamp)
}

export const toLongDateTime = timestamp => {
  let options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric'
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(timestamp)
}

export const toShortDate = timestamp => {
  let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Intl.DateTimeFormat('pt-BR', options).format(timestamp)
}

export const toCurrency = number => {
  let options = { style: 'currency', currency: 'BRL' }
  
  if (!number) {
    return new Intl.NumberFormat('pt-BR', options).format(0)
  }

  return new Intl.NumberFormat('pt-BR', options).format(Number(number))
}

export const getStatusIcon = (item) => {
  if (item.status == 0){
    return <Feather name="minus-circle" />
  }else{
    return <Feather name="check-circle" />
  }
}

export const getStatusName = (item) => {
  if (item.status == 0){
    return 'Aguardando Pagamento'
  }else{
    return 'Recebido'
  }
}

export const Touchable = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback
