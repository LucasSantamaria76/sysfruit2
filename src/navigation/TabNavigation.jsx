import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { itemsTab } from '../items/itemsTab'
import { View } from 'react-native'
import tw from '../lib/tailwind'

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
              <View style={tw`flex items-center justify-center w-16 h-full`}>
                <Ionicons
                  name={`${item.name}${isFocused() ? '' : '-outline'}`}
                  color={color}
                  size={size + 15}
                />
              </View>
            )
          })}
        />
      ))}
    </Navigator>
  )
}

export default TabNavigation
