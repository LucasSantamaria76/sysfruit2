import { View, Text } from 'react-native'
import tw from '../lib/tailwind'
import { formatPrice } from '../lib/formatPrice'
import { total } from '../lib/totals'
import { formatInTimeZone } from 'date-fns-tz'
import { AR } from '../constant'

const PrintTotalsCashWithdrawals = ({ cashWithdrawals }) => {
  return (
    <View style={tw`flex gap-1 p-2 border-b-2 border-teal-600`}>
      <Text style={tw`text-2xl font-semibold text-center text-teal-700 underline md:text-3xl`}>
        Retiros de Caja
      </Text>
      <View style={tw`flex flex-row items-center justify-between border-b border-black`}>
        <Text style={tw`font-semibold md:text-2xl`}>Descripcion</Text>
        <Text style={tw`font-semibold md:text-2xl`}>Hora</Text>
        <Text style={tw`font-semibold md:text-2xl`}>Importe</Text>
      </View>
      {cashWithdrawals.map((el) => (
        <View
          key={el.id}
          style={tw`flex flex-row items-center justify-between`}
        >
          <Text style={tw`w-[45%] text-lg font-semibold md:text-2xl`}>{el.description}</Text>
          <Text style={tw`w-[15%] font-semibold text-center md:text-2xl`}>
            {formatInTimeZone(el.created_at, AR, 'HH:mm')}
          </Text>
          <Text style={tw`w-[40%] text-right text-lg font-semibold text-red-600 md:text-2xl`}>
            {formatPrice(el.amount)}
          </Text>
        </View>
      ))}
      <View style={tw`flex flex-row items-center justify-between`}>
        <Text style={tw`text-xl font-bold md:text-3xl`}>Total retirado</Text>
        <Text style={tw`text-xl font-bold text-red-500 md:text-3xl`}>
          {formatPrice(total(cashWithdrawals))}
        </Text>
      </View>
    </View>
  )
}

export default PrintTotalsCashWithdrawals
