import { createStackNavigator } from '@react-navigation/stack'
import useAuthStore from '../stores/authStore'
import { PurchasesListingScreen, ShoppingScreen } from '../screens'

const { Navigator, Screen } = createStackNavigator()

const StackPurchases = () => {
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='ShoppingScreen'
        component={ShoppingScreen}
      />
      <Screen
        name='PurchasesListingScreen'
        component={PurchasesListingScreen}
      />
    </Navigator>
  )
}
export default StackPurchases
