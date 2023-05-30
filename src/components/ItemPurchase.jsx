import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { formatInTimeZone } from 'date-fns-tz'
import { formatPrice } from '../lib/formatPrice'
import { supabase } from '../lib/supabase'

const ItemPurchase = ({ item, role }) => {
  return (
    <View style={tw`flex items-start justify-start w-full h-24 gap-2 p-3`}>
      <View style={tw`flex flex-row justify-between w-full h-1/2`}>
        <Text style={tw`text-lg`}>Descripción: {item.description}</Text>
        <Text style={tw`text-lg`}>Importe: {formatPrice(item.amount)}</Text>
      </View>
      <View style={tw`flex flex-row justify-between w-full h-1/2`}>
        <Text style={tw`text-lg`}>
          Hora: {formatInTimeZone(item.created_at, 'America/Argentina/Buenos_Aires', 'HH:mm')}
        </Text>
        <Text style={tw`text-2xl w-7`}>{item.typeOfPayment === 'Efectivo' ? '💰' : '🪙'}</Text>
        {role === 'ADMIN' ? (
          <TouchableOpacity
            style={tw`flex items-center justify-center h-8 border border-red-500 rounded-md w-30`}
            onPress={async () => {
              const { error } = await supabase.from('purchases').delete().eq('id', item.id)
            }}
          >
            <Text style={tw`text-red-500`}>Eliminar</Text>
          </TouchableOpacity>
        ) : (
          <Text />
        )}
      </View>
    </View>
  )
}
export default ItemPurchase
