import { createStackNavigator } from '@react-navigation/stack'
import { AdminScreen, NoPermissions, DailySummary } from '../screens'
import useAuthStore from '../stores/authStore'

const { Navigator, Screen } = createStackNavigator()

const StackAdmin = () => {
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name='homeAdmin'
        component={profile.role === 'ADMIN' ? AdminScreen : NoPermissions}
      />
      <Screen
        name='dailySummary'
        component={DailySummary}
      />
    </Navigator>
  )
}
export default StackAdmin
