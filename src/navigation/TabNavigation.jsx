import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { itemsTab } from '../items/itemsTab'

const { Navigator, Screen } = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'teal'
      }}
    >
      {itemsTab.map((item) => (
        <Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={({ route, navigation: { isFocused } }) => ({
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={`${item.name}${isFocused() ? '' : '-outline'}`}
                color={color}
                size={size}
              />
            )
          })}
        />
      ))}
    </Navigator>
  )
}

export default TabNavigation
