import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuthStore from '../stores/authStore'

const ShoppingScreen = () => {
  const profile = useAuthStore((state) => state.profile)

  return (
    <SafeAreaView>
      <View>
        <Text>{profile.username}</Text>
        <Text>{profile.role}</Text>
      </View>
    </SafeAreaView>
  )
}

export default ShoppingScreen
