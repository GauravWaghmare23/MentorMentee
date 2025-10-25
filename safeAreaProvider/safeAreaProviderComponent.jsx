import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const safeAreaProviderComponent = ({children}) => {
  return (
    <SafeAreaView>
      {children}
    </SafeAreaView>
  )
}

export default safeAreaProviderComponent