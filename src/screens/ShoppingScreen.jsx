import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { useState } from 'react'
import { inputStyle } from '../styles'
import { formatDate } from '../lib/formatDate'
import { KEYS_Shopping } from '../constant'
import { itemsBtnShopping } from '../items'
import { useToast } from 'react-native-toast-notifications'
import { supabase } from '../lib/supabase'
import useAuthStore from '../stores/authStore'
import useMovementsStore from './../stores/movementsStore'

const ShoppingScreen = () => {
  const [description, setDescription] = useState('Varios')
  const [amount, setAmount] = useState('')
  const userId = useAuthStore((state) => state.profile.id)
  const { cashAvailable, cashChange, day, getMovements } = useMovementsStore((state) => ({
    cashAvailable: state.cashAvailable,
    cashChange: state.cashChange,
    getMovements: state.getMovements,
    day: state.id
  }))
  const toast = useToast()

  const handlePress = (value) => {
    if (value === '🗑️') return setAmount('')
    if (value === '.' && amount.includes('.')) return
    if (amount.includes('.') && amount.slice(amount.indexOf('.')).length > 2) return

    amount.length < 12 && setAmount((prev) => (prev += value))
  }

  const handleSave = async (val) => {
    try {
      const typeOfPayment = val === '💰' ? 'Efectivo' : 'Otros'
      const { error } = await supabase
        .from('purchases')
        .insert([{ amount, description, userId, day, typeOfPayment }])
      if (error) throw error

      getMovements()
      setAmount('')

      toast.show('Compra Realizada', { type: 'success' })
    } catch (error) {
      toast.show(`Operación no realizada, Error: ${error}`, { type: 'danger' })
    }
  }
  return (
    <SafeAreaView>
      <View style={tw`items-center gap-3`}>
        <View style={tw`flex flex-row items-center justify-center w-full h-16 px-3 bg-teal-700`}>
          <View style={tw`flex items-center justify-center h-16`}>
            <Text style={tw`text-2xl font-extrabold text-red-500`}>Ingreso de compras</Text>
            <Text style={tw`text-white`}>{formatDate}</Text>
          </View>
        </View>
        <TextInput
          autoCapitalize='words'
          inputMode='text'
          value={description}
          onChangeText={setDescription}
          style={[inputStyle, tw`pt-1 text-3xl`]}
        />
        <TextInput
          editable={false}
          autoCapitalize='words'
          inputMode='text'
          value={amount}
          style={[inputStyle, tw`pt-1 text-4xl font-bold text-right`]}
        />

        <View style={tw`flex flex-row flex-wrap w-11/12 h-auto`}>
          {KEYS_Shopping.map((el) => (
            <TouchableOpacity
              key={el}
              style={tw`flex items-center justify-center w-1/4 h-16 bg-gray-300 border border-black rounded-md`}
              onPress={() => (['💰', '🪙'].includes(el) ? handleSave(el) : handlePress(el))}
            >
              <Text style={tw`w-full pt-2 text-4xl font-bold text-center text-teal-600`}>{el}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={tw`flex flex-row flex-wrap w-11/12 h-auto`}>
          {itemsBtnShopping.map((el) => (
            <TouchableOpacity
              key={el.name}
              style={tw`flex items-center justify-center w-1/4 h-16 bg-white border border-black rounded-md`}
              onPress={() => setDescription(el.name)}
            >
              <Image
                source={el.image}
                style={tw`w-1/2 h-3/5`}
              />
              <Text style={tw`text-xs`}>{el.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ShoppingScreen
