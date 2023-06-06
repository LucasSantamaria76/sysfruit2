import { Text, View } from 'react-native'
import tw from 'twrnc'
import useAuthStore from '../stores/authStore'
import { UserForm } from '../components'

const AuthScreen = () => {
  const login = useAuthStore((state) => state.login)

  const onSubmit = async ({ email, password }) => {
    try {
      const { error } = await login(email, password)
      if (error) throw error
    } catch (error) {
      toast.show(error.message, { type: 'danger' })
    }
  }

  return (
    <View style={tw`flex items-center justify-center w-full h-full gap-5 p-4`}>
      <Text style={tw`pb-6 text-4xl font-bold text-teal-500`}>Iniciar sesión</Text>
      <UserForm
        login
        handleSave={onSubmit}
      />
    </View>
  )
}

export default AuthScreen
