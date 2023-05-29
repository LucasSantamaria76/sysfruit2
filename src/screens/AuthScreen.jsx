import { useRef, useState } from 'react'
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import tw from 'twrnc'
import useAuthStore from '../stores/authStore'
import { useToast } from 'react-native-toast-notifications'
import { inputStyleWithIcons } from '../styles'

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const login = useAuthStore((state) => state.login)
  const passwordRef = useRef(null)
  const toast = useToast()

  const onSubmit = async () => {
    setError('')
    if (!email.trim().length || !password.trim().length)
      return setError('El email y la contraseña son requeridos')
    try {
      const { error, data } = await login(email, password)
      if (error) throw error
    } catch (error) {
      toast.show(error.message, { type: 'danger' })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <View style={tw`flex items-center justify-center w-full h-full gap-5 p-4`}>
          <Text style={tw`pb-6 text-4xl font-bold text-teal-500`}>Iniciar sesión</Text>

          <View style={inputStyleWithIcons}>
            <MaterialCommunityIcons
              name='email-edit-outline'
              size={24}
              color='black'
            />
            <TextInput
              value={email}
              placeholder='Ingrese su email'
              style={tw`w-11/12 text-xl`}
              onChangeText={setEmail}
              keyboardType='email-address'
              returnKeyType='next'
              selectTextOnFocus
              blurOnSubmit={false}
              onSubmitEditing={() => {
                passwordRef.current?.focus()
              }}
            />
          </View>
          <View style={inputStyleWithIcons}>
            <MaterialCommunityIcons
              name='account-lock-outline'
              size={24}
              color='black'
            />
            <TextInput
              value={password}
              secureTextEntry={secureTextEntry}
              ref={passwordRef}
              returnKeyType='done'
              style={tw`w-4/5 text-xl`}
              placeholder='Ingrese su contraseña'
              onChangeText={setPassword}
              autoCapitalize='none'
              onSubmitEditing={onSubmit}
            />
            <MaterialCommunityIcons
              name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color='black'
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
          </View>
          <Text style={tw`text-red-500`}>{error}</Text>
          {/* {error && (
          )} */}
          <TouchableOpacity
            style={tw`w-full py-2 bg-teal-500 rounded-md `}
            onPress={onSubmit}
          >
            <Text style={tw`text-xl font-bold text-center text-white`}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default AuthScreen
