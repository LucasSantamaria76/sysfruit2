import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { KEYS } from '../constant'
import { useState } from 'react'
import { Entypo } from 'react-native-vector-icons'
import useMovementsStore from '../stores/movementsStore'
import useAuthStore from '../stores/authStore'
import { useToast } from 'react-native-toast-notifications'
import { supabase } from '../lib/supabase'

const AmountEntryScreen = ({ navigation, route: { params } }) => {
  const [amount, setAmount] = useState('')
  const userId = useAuthStore((state) => state.profile.id)
  const day = useMovementsStore((state) => state.id)
  const { typeOfPayment } = params
  const toast = useToast()

  const handlePress = (value) => {
    if (value === '🗑️') return setAmount('')
    if (value === '⌫') return setAmount((prev) => (prev = prev.slice(0, -1)))
    if (value === '.' && amount.includes('.')) return
    if (amount.includes('.') && amount.slice(amount.indexOf('.')).length > 2) return

    amount.length < 12 && setAmount((prev) => (prev += value))
  }

  const handleSave = async () => {
    if (!userId && !amount && !typeOfPayment && !day) return
    try {
      const { error } = await supabase
        .from('sales')
        .insert([{ userId, amount, typeOfPayment, day }])
      if (error) throw error
      //addSale(data)
      toast.show(`Venta de $${amount} agregada`, { type: 'success' })
      navigation.goBack()
    } catch (error) {
      toast.show(`Error al agregar la venta`, { type: 'danger' })
      console.log('err => ', error)
    }
  }

  return (
    <SafeAreaView style={tw`items-center flex-1`}>
      <View style={tw`flex flex-row w-full h-24 bg-teal-700`}>
        <Entypo
          name='chevron-left'
          color='white'
          size={40}
          style={tw`self-center`}
          onPress={() => navigation.goBack()}
        />
        <View style={tw`flex items-center justify-center w-10/12`}>
          <Text style={tw`self-center text-2xl text-white`}>Tipo de operación:</Text>
          <Text style={tw`self-center text-4xl font-bold text-red-500`}>{typeOfPayment}</Text>
        </View>
      </View>
      <View style={tw`p-4`}>
        <View
          style={tw`flex flex-row items-center justify-end w-full h-16 px-2 bg-white border border-gray-900 rounded-md`}
        >
          <Text style={tw`mt-2 text-5xl`}>{amount}</Text>
        </View>
        <View style={tw`flex flex-row flex-wrap w-full h-auto mt-3`}>
          {KEYS.map((el) => (
            <TouchableOpacity
              key={el}
              style={tw`flex items-center justify-center w-1/4 h-24 bg-gray-300 border border-black rounded-md`}
              onPress={() => (el === '💾' ? handleSave() : handlePress(el))}
            >
              <Text style={tw`pt-3 text-5xl font-bold text-teal-600`}>{el}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
export default AmountEntryScreen
