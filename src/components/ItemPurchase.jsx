import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from '../lib/tailwind'
import { formatInTimeZone } from 'date-fns-tz'
import { formatPrice } from '../lib/formatPrice'
import { supabase } from '../lib/supabase'
import { AR, CASH } from '../constant'

const ItemPurchase = ({ item, role }) => {
  return (
    <View style={tw`flex items-start justify-start w-full h-24 gap-2 p-3 md:h-32`}>
      <View style={tw`flex flex-row justify-between w-full h-1/2`}>
        <Text style={tw`text-lg md:text-3xl`}>Descripción: {item.description}</Text>
        <Text style={tw`text-lg md:text-3xl`}>Importe: {formatPrice(item.amount)}</Text>
      </View>
      <View style={tw`flex flex-row justify-between w-full h-1/2`}>
        <Text style={tw`text-lg md:text-3xl`}>
          Hora: {formatInTimeZone(item.created_at, AR, 'HH:mm')}
        </Text>
        <Text style={tw`text-2xl w-7 md:text-5xl md:w-14`}>
          {item.typeOfPayment === CASH ? '💰' : '🪙'}
        </Text>
        {role === 'ADMIN' ? (
          <TouchableOpacity
            style={tw`flex items-center justify-center h-8 border border-red-500 rounded-md w-30 md:h-12 md:w-44 md:border-2`}
            onPress={async () => {
              const { error } = await supabase.from('purchases').delete().eq('id', item.id)
            }}
          >
            <Text style={tw`font-bold text-red-500 md:text-2xl`}>Eliminar</Text>
          </TouchableOpacity>
        ) : (
          <Text />
        )}
      </View>
    </View>
  )
}
export default ItemPurchase
