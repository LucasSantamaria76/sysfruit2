import { View, Text, ScrollView } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import useMovementsStore from '../stores/movementsStore'
import tw from '../lib/tailwind'
import { formatPrice } from './../lib/formatPrice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrintTotalsCashWithdrawals, PrintTotalsPurchases, PrintTotalsSales } from '../components'

const DailySummary = ({ navigation }) => {
  const { cashAvailable, cashWithdrawals, cashChange, purchases, sales } = useMovementsStore(
    (state) => ({
      cashAvailable: state.cashAvailable,
      cashChange: state.cashChange,
      sales: state.sales,
      cashWithdrawals: state.cashWithdrawals,
      purchases: state.purchases
    })
  )

  return (
    <SafeAreaView>
      <View style={tw`flex flex-row justify-between w-full h-16 bg-teal-700 md:h-20`}>
        <Entypo
          name='chevron-left'
          color='white'
          size={32}
          style={tw`self-center`}
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`self-center text-2xl text-white md:text-4xl md:m-2`}>Resumen del día</Text>
        <Text />
      </View>
      <ScrollView style={tw`w-full`}>
        <View style={tw`flex flex-row items-center justify-between p-2 border-b border-black`}>
          <Text style={tw`text-xl font-semibold md:text-4xl md:m-2`}>Cambio en caja:</Text>
          <Text style={tw`text-xl font-semibold text-red-600 md:text-4xl md:m-2`}>
            {formatPrice(cashChange)}
          </Text>
        </View>

        <PrintTotalsSales sales={sales} />

        <PrintTotalsPurchases purchases={purchases} />

        <PrintTotalsCashWithdrawals cashWithdrawals={cashWithdrawals} />

        <View style={tw`flex flex-row items-center justify-between p-2 border-b-2 border-teal-600`}>
          <Text style={tw`text-2xl font-bold md:text-4xl md:m-2`}>Efectivo en caja</Text>
          <Text style={tw`text-2xl font-bold text-red-500 md:text-4xl md:m-2`}>
            {formatPrice(cashAvailable)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default DailySummary
