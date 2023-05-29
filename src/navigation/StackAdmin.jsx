import { createStackNavigator } from '@react-navigation/stack'
import { AdminScreen } from '../screens'

const { Navigator, Screen } = createStackNavigator()

const StackAdmin = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='homeAdmin'
        component={AdminScreen}
      />
    </Navigator>
  )
}
export default StackAdmin
