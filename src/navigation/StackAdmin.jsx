import { createStackNavigator } from '@react-navigation/stack'
import useAuthStore from '../stores/authStore'
import { AdminScreen, NoPermissions } from '../screens'
import { itemsMenuAdmin } from '../items/itemsMenuAdmin'

const { Navigator, Screen } = createStackNavigator()

const StackAdmin = () => {
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='homeAdmin'
        component={profile.role === 'ADMIN' ? AdminScreen : NoPermissions}
      />
      {itemsMenuAdmin.map((item) => (
        <Screen
          key={item.page}
          name={item.page}
          component={item.screen}
        />
      ))}
    </Navigator>
  )
}
export default StackAdmin
