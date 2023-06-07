import { Alert, View, Text, Image, TouchableOpacity } from 'react-native'
import tw from '../lib/tailwind'
import { typeOfPayment } from '../items'
import { formatInTimeZone } from 'date-fns-tz'
import { formatPrice } from '../lib/formatPrice'
import { Entypo } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'
import { AR } from '../constant'

const handleDelete = (sale) => {
  try {
    Alert.alert('Eliminar', '¿Seguro que desea eliminar la venta?', [
      {
        text: 'No'
      },
      {
        text: 'Si',
        onPress: async () => {
          const { error } = await supabase.from('sales').delete().eq('id', sale)
          if (error) throw new Error(error)
        }
      }
    ])
  } catch (error) {
    Alert.alert('Error', JSON.stringify({ error }, null, 2))
  }
}

const ItemSale = ({ item, role }) => {
  return (
    <View style={tw`flex flex-row items-center w-full h-12 md:h-18`}>
      <Image
        size='sm'
        resizeMode='contain'
        source={typeOfPayment(item.typeOfPayment)}
        alt={item.typeOfPayment}
        style={tw`w-[15%] h-8 md:h-14`}
      />
      <Text style={tw`w-[20%] text-center text-xs md:text-xl`}>{item.profiles?.username}</Text>
      <Text style={tw`w-[35%] text-right  text-lg md:text-3xl`}>{formatPrice(item.amount)}</Text>
      <Text style={tw`w-[20%] text-center text-sm md:text-2xl`}>
        {formatInTimeZone(item.created_at, AR, 'HH:mm')}
      </Text>
      {role === 'ADMIN' && (
        <TouchableOpacity
          style={tw`w-[10%]`}
          onPress={() => handleDelete(item.id)}
        >
          <Entypo
            name='trash'
            size={24}
            style={tw`text-center text-red-700`}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default ItemSale
