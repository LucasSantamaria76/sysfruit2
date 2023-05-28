import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { typeOfPayment } from '../items'
import { formatInTimeZone } from 'date-fns-tz'
import { formatPrice } from '../lib/formatPrice'
import { Entypo } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'

const ItemSale = ({ item, role }) => {
  return (
    <View style={tw`flex flex-row items-center w-full h-14`}>
      <Image
        size='xs'
        resizeMode='contain'
        source={typeOfPayment(item.typeOfPayment)}
        alt={item.typeOfPayment}
        style={tw`w-[20%] h-9`}
      />
      <Text style={tw`w-[42%] text-right text-lg`}>{formatPrice(item.amount)}</Text>
      <Text style={tw`w-[25%] text-center`}>
        {formatInTimeZone(item.created_at, 'America/Argentina/Buenos_Aires', 'HH:mm')}
      </Text>
      {role === 'ADMIN' && (
        <TouchableOpacity
          style={tw`w-[9%] mr-2`}
          onPress={async () => {
            const { error } = await supabase.from('sales').delete().eq('id', item.id)
          }}
        >
          <Entypo
            name='trash'
            size={20}
            style={tw`text-center text-red-700`}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}
export default ItemSale
