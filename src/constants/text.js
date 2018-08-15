import React from 'react'
import { Platform  } from 'react-native'
import glamorous from 'glamorous-native'

export const Bold = glamorous.text({
  fontWeight: 'bold',
  color: '#000',
  paddingVertical: 5
})


export const Light = glamorous.text({
  fontWeight: '300',
  color: '#000',
  paddingVertical: 5
})

export const Normal = glamorous.text({
  fontWeight: 'normal',
  color: '#000',
  paddingVertical: 5
})

export const Text = glamorous.text({})


export default Normal