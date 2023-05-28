import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useMovementsStore from '../stores/movementsStore'

const ShoppingScreen = () => {
  const { cashAvailable, cashChange } = useMovementsStore((state) => ({
    cashAvailable: state.cashAvailable,
    cashChange: state.cashChange
  }))

  return (
    <SafeAreaView>
      <View>
        <Text>Efectivo en caja: {cashAvailable}</Text>
        <Text>cambio en caja: {cashChange}</Text>
      </View>
    </SafeAreaView>
  )
}

export default ShoppingScreen
