import { View, Text, Image, TouchableOpacity } from 'react-native'
import tw from '../lib/tailwind'
import { Entypo, SimpleLineIcons } from '@expo/vector-icons'

const ItemUser = ({ deleteUser, item, setUser }) => {
  return (
    <View style={tw`flex flex-row items-center justify-between w-full h-10 px-2 md:h-16`}>
      <Text style={tw`w-[45%] text-lg md:text-2xl`}>{item?.username}</Text>
      <Text style={tw`w-[30%] text-center text-lg md:text-2xl`}>
        {item?.role === 'ADMIN' ? 'Administrador' : 'Operador'}
      </Text>
      <View style={tw`w-[20%] flex items-center justify-evenly flex-row`}>
        <TouchableOpacity onPress={() => setUser(item)}>
          <SimpleLineIcons
            name='pencil'
            size={24}
            color='blue'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteUser(item)}>
          <Entypo
            name='trash'
            size={24}
            style={tw`text-center text-red-700`}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default ItemUser
