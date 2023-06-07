import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
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
  const { cashAvailable, cashChange, day, getMovements } = useMovementsStore((state) => ({
    getMovements: state.getMovements,
    day: state.id,
    cashAvailable: state.cashAvailable,
    cashChange: state.cashChange
  }))
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
    try {
      if (typeOfPayment === 'Cambio en caja') {
        const { error } = await supabase
          .from('movementsOfTheDay')
          .update({ cashChange: amount })
          .eq('id', day)

        if (error) throw error

        getMovements()
        toast.show(`Cambio en caja $${amount}`, { type: 'normal' })
        navigation.goBack()
        return
      }

      if (!userId && !amount && !day) return

      const { error } = await supabase
        .from('sales')
        .insert([{ userId, amount, typeOfPayment, day }])

      if (error) throw error

      toast.show(`Venta de $${amount} agregada`, { type: 'success' })
      navigation.goBack()
    } catch (error) {
      toast.show(`Error: operación no realizada`, { type: 'danger' })
    }
  }

  return (
    <SafeAreaView style={tw`items-center flex-1`}>
      <View style={tw`flex flex-row w-full h-24 bg-teal-700 md:h-36`}>
        <Entypo
          name='chevron-left'
          color='white'
          size={40}
          style={tw`self-center`}
          onPress={() => navigation.goBack()}
        />
        <View style={tw`flex items-center justify-center w-10/12`}>
          <Text style={tw`self-center mb-2 text-2xl text-white md:text-4xl md:mb-4`}>
            Tipo de operación:
          </Text>
          <Text style={tw`self-center text-4xl font-bold text-red-500 md:text-6xl`}>
            {typeOfPayment}
          </Text>
        </View>
      </View>
      <View style={tw`w-11/12 mt-10`}>
        <View
          style={tw`w-full h-16 bg-white border border-gray-900 rounded-md md:h-28 md:w-10/12 md:mx-auto`}
        >
          <Text style={tw`m-3 text-5xl text-right md:text-8xl md:m-4`}>{amount}</Text>
        </View>
        <View style={tw`flex flex-row flex-wrap w-full h-auto mt-5 md:w-10/12 md:mx-auto`}>
          {KEYS.map((el) => (
            <TouchableOpacity
              key={el}
              style={tw`flex items-center justify-center w-1/4 h-24 bg-gray-300 border border-black rounded-md md:h-36`}
              onPress={() => (el === '💾' ? handleSave() : handlePress(el))}
            >
              <Text style={tw`pt-3 text-5xl font-bold text-teal-600 md:text-7xl`}>{el}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
export default AmountEntryScreen
