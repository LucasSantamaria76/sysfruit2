import { useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import tw from '../lib/tailwind'
import { inputStyle } from '../styles'
import { useToast } from 'react-native-toast-notifications'
import useAuthStore from '../stores/authStore'
import useMovementsStore from '../stores/movementsStore'
import { supabase } from '../lib/supabase'
import { SafeAreaView } from 'react-native-safe-area-context'

const CashWithdrawals = ({ navigation }) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('Retiro')
  const userId = useAuthStore((state) => state.profile.id)
  const day = useMovementsStore((state) => state.id)
  const getCashWithdrawals = useMovementsStore((state) => state.getCashWithdrawals)
  const inputRef = useRef(null)
  const toast = useToast()

  const save = async () => {
    try {
      if (!amount || !description)
        return toast.show('La descripción y el importe son requeridos', { type: 'warning' })
      const { error } = await supabase
        .from('cashWithdrawals')
        .insert([{ amount, description, userId, day }])
      if (error) throw error

      getCashWithdrawals()
      setAmount('')
      navigation.goBack()
      toast.show('Operación Realizada con éxito', { type: 'success' })
    } catch (error) {
      toast.show(`Operación no realizada, Error: ${error}`, { type: 'danger' })
    }
  }

  return (
    <SafeAreaView style={tw`flex items-center gap-5`}>
      <View style={tw`flex items-center justify-center w-full h-16 bg-teal-700 md:h-30`}>
        <View style={tw`flex flex-row items-center justify-between w-full`}>
          <Entypo
            name='chevron-left'
            color='white'
            size={40}
            style={tw`self-center md:pl-2`}
            onPress={() => navigation.goBack()}
          />
          <Text style={tw`text-3xl font-bold text-white md:text-6xl`}>Retiros de caja</Text>
          <Text />
        </View>
      </View>
      <View style={tw`items-center w-full gap-3 md:w-9/12`}>
        <View style={tw`items-center w-11/12`}>
          <Text style={tw`self-start w-full text-lg md:text-2xl`}>Descripción</Text>
          <TextInput
            autoFocus={true}
            enterKeyHint='next'
            enablesReturnKeyAutomatically={true}
            autoCapitalize='words'
            inputMode='text'
            value={description}
            onChangeText={setDescription}
            onSubmitEditing={() => inputRef.current?.focus()}
            style={[inputStyle, tw`w-full pt-1 text-3xl md:h-16`]}
          />
        </View>
        <View style={tw`items-center w-11/12`}>
          <Text style={tw`self-start w-full text-lg md:text-2xl`}>Importe</Text>
          <TextInput
            ref={inputRef}
            autoFocus={true}
            enterKeyHint='done'
            enablesReturnKeyAutomatically={true}
            inputMode='numeric'
            value={amount}
            onChangeText={setAmount}
            onSubmitEditing={save}
            style={[inputStyle, tw`w-full pt-1 text-4xl font-bold text-right md:h-16`]}
          />
        </View>
        <TouchableOpacity
          style={tw`flex items-center justify-center w-11/12 bg-teal-600 rounded-lg h-14 md:h-20`}
          onPress={save}
        >
          <Text style={tw`text-2xl text-white md:text-5xl`}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default CashWithdrawals
