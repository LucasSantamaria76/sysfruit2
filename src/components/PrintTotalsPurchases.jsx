import { View, Text } from 'react-native'
import tw from '../lib/tailwind'
import { formatPrice } from '../lib/formatPrice'
import { total, totals } from '../lib/totals'

const PrintTotalsPurchases = ({ purchases }) => {
  const totalsPurchases = totals(purchases)

  return (
    <View style={tw`flex gap-1 p-2 border-b-2 border-teal-600`}>
      <Text style={tw`text-2xl font-semibold text-center text-teal-700 underline md:text-3xl`}>
        Total de salidas en
      </Text>
      <View style={tw`flex flex-row items-center justify-between border-b border-black`}>
        <Text style={tw`font-semibold md:text-2xl`}>T.Operación</Text>
        <Text style={tw`font-semibold md:text-2xl`}>Cantidad</Text>
        <Text style={tw`font-semibold md:text-2xl`}>Importe</Text>
      </View>
      {Object.keys(totalsPurchases).map((el) => (
        <View
          key={el}
          style={tw`flex flex-row items-center justify-between`}
        >
          <Text style={tw`w-[45%] text-lg font-semibold md:text-2xl`}>{el}</Text>
          <Text style={tw`w-[15%] text-lg font-semibold md:text-2xl text-center`}>
            {totalsPurchases[el].quantity}
          </Text>
          <Text style={tw`w-[40%] text-right text-lg font-semibold text-red-600 md:text-2xl`}>
            {formatPrice(totalsPurchases[el].amount)}
          </Text>
        </View>
      ))}
      <View style={tw`flex flex-row items-center justify-between border-t border-black`}>
        <Text style={tw`text-xl font-bold md:text-3xl`}>Total de Salidas</Text>
        <Text style={tw`text-lg font-bold text-center text-green-500 md:text-2xl`}>
          {purchases.length}
        </Text>
        <Text style={tw`text-xl font-bold text-red-500 md:text-3xl`}>
          {formatPrice(total(purchases))}
        </Text>
      </View>
    </View>
  )
}

export default PrintTotalsPurchases
