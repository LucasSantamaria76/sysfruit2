import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './TabNavigation'
import { AuthScreen } from '../screens'
import useAuthStore from '../stores/authStore'

const { Navigator, Screen } = createStackNavigator()

const RootStack = () => {
  const session = useAuthStore((state) => state.session)
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name='root'
          component={session ? TabNavigation : AuthScreen}
        />
      </Navigator>
    </NavigationContainer>
  )
}
export default RootStack
