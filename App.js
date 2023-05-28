import { StatusBar } from 'expo-status-bar'
import { ToastProvider } from 'react-native-toast-notifications'
import RootStack from './src/navigation/RootStack'

export default function App() {
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
