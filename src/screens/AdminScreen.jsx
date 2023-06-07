import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import { itemsMenuAdmin } from '../items/itemsMenuAdmin'

const AdminScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={tw`flex items-center justify-center w-full h-12 mb-3 bg-teal-700 md:h-20`}>
        <Text style={tw`text-2xl text-white md:text-4xl`}>Administración</Text>
      </View>
      <View style={tw`flex flex-row flex-wrap justify-between w-11/12 gap-3 mx-auto`}>
        {itemsMenuAdmin.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={tw`w-[48%] flex justify-center h-40 border border-black rounded-lg md:h-60`}
            onPress={() => {
              navigation.navigate(item.page)
            }}
          >
            <Image
              source={item.image}
              style={tw`mx-auto rounded-lg h-3/5 md:h-[75%] w-[45%]`}
            />
            <Text style={tw`w-full text-lg text-center md:text-2xl`}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}
export default AdminScreen
