import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useMovementsStore from '../stores/movementsStore'

const AdminScreen = () => {
  const { cashAvailable, cashChange } = useMovementsStore((state) => ({
    cashAvailable: state.cashAvailable,
    cashChange: state.cashChange
  }))
  return (
    <SafeAreaView>
      <View>
        <Text>Dinero en caja: {cashAvailable}</Text>
        <Text>Cambio: {cashChange}</Text>
      </View>
    </SafeAreaView>
  )
}
export default AdminScreen
