import { createStackNavigator } from '@react-navigation/stack'
import { AmountEntryScreen, HomeScreen } from '../screens'

const { Navigator, Screen } = createStackNavigator()

const StackSales = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='admin'
        component={HomeScreen}
        options={{ title: 'Administración' }}
      />
      <Screen
        name='AmountEntry'
        component={AmountEntryScreen}
        options={{ title: '' }}
      />
    </Navigator>
  )
}
export default StackSales
