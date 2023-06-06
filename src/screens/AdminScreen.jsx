import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { itemsMenuAdmin } from '../items/itemsMenuAdmin'

const AdminScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={tw`flex items-center justify-center w-full h-12 mb-3 bg-teal-700`}>
        <Text style={tw`text-2xl text-white`}>Administración</Text>
      </View>
      <View style={tw`flex flex-row flex-wrap justify-between w-11/12 gap-3 mx-auto`}>
        {itemsMenuAdmin.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={tw`w-[48%] flex justify-center p-2 h-40 border border-black rounded-lg`}
            onPress={() => {
              navigation.navigate(item.page)
            }}
          >
            <Image
              source={item.image}
              style={tw`w-2/5 mx-auto rounded-lg h-3/5`}
            />
            <Text style={tw`w-full text-lg text-center`}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}
export default AdminScreen
