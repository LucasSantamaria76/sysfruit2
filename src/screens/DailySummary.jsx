import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import useMovementsStore from '../stores/movementsStore'
import tw from 'twrnc'
import { formatPrice } from './../lib/formatPrice'
import { total, totals } from '../lib/totals'

const DailySummary = ({ navigation }) => {
  const { cashAvailable, cashChange, purchases, sales } = useMovementsStore((state) => ({
    cashAvailable: state.cashAvailable,
    cashChange: state.cashChange,
    sales: state.sales,
    purchases: state.purchases
  }))
  const totalsSales = totals(sales)
  const totalsPurchases = totals(purchases)

  return (
    <SafeAreaView>
      <View style={tw`flex flex-row w-full h-16 bg-teal-700`}>
        <Entypo
          name='chevron-left'
          color='white'
          size={32}
          style={tw`self-end`}
          onPress={() => navigation.goBack()}
        />
        <View style={tw`flex items-center justify-end w-10/12`}>
          <Text style={tw`self-center text-2xl text-white`}>Resumen del día</Text>
        </View>
      </View>
      <ScrollView style={tw`w-full`}>
        <View style={tw`flex flex-row items-center justify-between p-2 border-b border-black`}>
          <Text style={tw`text-xl font-semibold `}>Cambio en caja:</Text>
          <Text style={tw`text-xl font-semibold text-red-600`}>{formatPrice(cashChange)}</Text>
        </View>
        <View style={tw`flex gap-1 p-2 border-b-2 border-teal-600`}>
          <Text style={tw`text-2xl font-semibold text-center text-teal-700 underline`}>
            Total de ventas en
          </Text>
          <View style={tw`flex flex-row items-center justify-between border-b border-black`}>
            <Text style={tw`font-semibold `}>T.Operación</Text>
            <Text style={tw`font-semibold`}>Cantidad</Text>
            <Text style={tw`font-semibold`}>Importe</Text>
          </View>
          {Object.keys(totalsSales).map((el) => (
            <View
              key={el}
              style={tw`flex flex-row items-center justify-between`}
            >
              <Text style={tw`w-[45%] text-lg font-semibold`}>{el}</Text>
              <Text style={tw`w-[15%] text-lg font-semibold text-center`}>
                {totalsSales[el].quantity}
              </Text>
              <Text style={tw`w-[40%] text-right text-lg font-semibold text-red-600`}>
                {formatPrice(totalsSales[el].amount)}
              </Text>
            </View>
          ))}
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text style={tw`text-xl font-bold `}>Total de ventas</Text>
            <Text style={tw`text-xl font-bold text-red-500`}>{formatPrice(total(sales))}</Text>
          </View>
        </View>
        <View style={tw`flex gap-1 p-2 border-b-2 border-teal-600`}>
          <Text style={tw`text-2xl font-semibold text-center text-teal-700 underline`}>
            Total de salidas en
          </Text>
          <View style={tw`flex flex-row items-center justify-between border-b border-black`}>
            <Text style={tw`font-semibold `}>T.Operación</Text>
            <Text style={tw`font-semibold`}>Cantidad</Text>
            <Text style={tw`font-semibold`}>Importe</Text>
          </View>
          {Object.keys(totalsPurchases).map((el) => (
            <View
              key={el}
              style={tw`flex flex-row items-center justify-between`}
            >
              <Text style={tw`w-[45%] text-lg font-semibold `}>{el}</Text>
              <Text style={tw`w-[15%] text-lg font-semibold text-center`}>
                {totalsPurchases[el].quantity}
              </Text>
              <Text style={tw`w-[40%] text-right text-lg font-semibold text-red-600`}>
                {formatPrice(totalsPurchases[el].amount)}
              </Text>
            </View>
          ))}
          <View style={tw`flex flex-row items-center justify-between`}>
            <Text style={tw`text-xl font-bold `}>Total de Salidas</Text>
            <Text style={tw`text-xl font-bold text-red-500`}>{formatPrice(total(purchases))}</Text>
          </View>
        </View>
        <View style={tw`flex flex-row items-center justify-between p-2 border-b-2 border-teal-600`}>
          <Text style={tw`text-2xl font-bold `}>Efectivo en caja</Text>
          <Text style={tw`text-2xl font-bold text-red-500`}>{formatPrice(cashAvailable)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default DailySummary
