import { View, Text } from 'react-native'
import tw from 'twrnc'
import { formatPrice } from '../lib/formatPrice'
import { total, totals } from '../lib/totals'

const PrintTotalsPurchases = ({ purchases }) => {
  const totalsPurchases = totals(purchases)

  return (
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
  )
}

export default PrintTotalsPurchases
