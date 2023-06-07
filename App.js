import { StatusBar } from 'expo-status-bar'
import { ToastProvider } from 'react-native-toast-notifications'
import RootStack from './src/navigation/RootStack'
import tw from './src/lib/tailwind'
import { useDeviceContext } from 'twrnc'

export default function App() {
  useDeviceContext(tw)
  return (
    <ToastProvider
      placement='top'
      textStyle={{ fontSize: 20 }}
      duration={2000}
      offsetTop={100}
    >
      <RootStack />
      <StatusBar style='auto' />
    </ToastProvider>
  )
}
