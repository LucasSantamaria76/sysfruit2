import { View, Text } from 'react-native'
import tw from 'twrnc'

const NoPermissions = () => {
  return (
    <View style={tw`flex items-center justify-center w-full h-full`}>
      <Text style={tw`text-5xl font-extrabold text-center text-red-500`}>Sección restringida</Text>
    </View>
  )
}
export default NoPermissions
