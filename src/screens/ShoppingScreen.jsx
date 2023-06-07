import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from '../lib/tailwind'
import { useState } from 'react'
import { inputStyle } from '../styles'
import { formatDate } from '../lib/formatDate'
import { CASH, KEYS_Shopping, OTHERS } from '../constant'
import { itemsBtnShopping } from '../items'
import { useToast } from 'react-native-toast-notifications'
import { supabase } from '../lib/supabase'
import useAuthStore from '../stores/authStore'
import useMovementsStore from './../stores/movementsStore'
import { FontAwesome } from '@expo/vector-icons'

const ShoppingScreen = ({ navigation }) => {
  const [description, setDescription] = useState('Varios')
  const [amount, setAmount] = useState('')
  const userId = useAuthStore((state) => state.profile.id)
  const { cashAvailable, cashChange, day, getPurchases } = useMovementsStore((state) => ({
    cashAvailable: state.cashAvailable,
    cashChange: state.cashChange,
    getPurchases: state.getPurchases,
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
      if (!amount || !description)
        return toast.show('La descripción y el importe son requeridos', { type: 'warning' })
      const typeOfPayment = val === '💰' ? CASH : OTHERS
      const { error } = await supabase
        .from('purchases')
        .insert([{ amount, description, userId, day, typeOfPayment }])
      if (error) throw error

      getPurchases()
      setAmount('')

      toast.show('Operación Realizada con éxito', { type: 'success' })
    } catch (error) {
      toast.show(`Operación no realizada, Error: ${error}`, { type: 'danger' })
    }
  }
  return (
    <SafeAreaView>
      <View style={tw`items-center gap-3`}>
        <View
          style={tw`flex flex-row items-center justify-between w-full h-16 px-3 bg-teal-700 md:h-20`}
        >
          <Text />
          <View style={tw`flex items-center justify-center h-16 md:h-20`}>
            <Text style={tw`text-2xl font-extrabold text-red-500 md:text-4xl`}>
              Ingreso de salidas
            </Text>
            <Text style={tw`text-white md:text-xl`}>{formatDate(Date.now())}</Text>
          </View>
          <FontAwesome
            name='list-alt'
            size={32}
            color='white'
            onPress={() => {
              navigation.navigate('PurchasesListingScreen')
            }}
          />
        </View>
        <View style={tw`w-11/12 md:w-9/12`}>
          <View style={tw`items-center w-full mb-4`}>
            <Text style={tw`self-start w-full text-sm md:text-xl`}>Descripción</Text>
            <TextInput
              autoCapitalize='words'
              inputMode='text'
              value={description}
              onChangeText={setDescription}
              style={[inputStyle, tw`w-full pt-1 text-3xl md:h-16`]}
            />
          </View>
          <View style={tw`items-center w-full`}>
            <Text style={tw`self-start w-full text-sm md:text-xl`}>Importe</Text>
            <TextInput
              editable={false}
              inputMode='text'
              value={amount}
              style={[inputStyle, tw`w-full pt-1 text-4xl font-bold text-right md:h-16`]}
            />
          </View>
        </View>

        <View style={tw`flex flex-row flex-wrap w-11/12 h-auto md:w-9/12`}>
          {KEYS_Shopping.map((el) => (
            <TouchableOpacity
              key={el}
              style={tw`flex items-center justify-center w-1/4 h-16 bg-gray-300 border border-black rounded-md md:h-24`}
              onPress={() => (['💰', '🪙'].includes(el) ? handleSave(el) : handlePress(el))}
            >
              <Text
                style={tw`w-full pt-2 text-4xl font-bold text-center text-teal-600 md:text-6xl`}
              >
                {el}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={tw`flex flex-row flex-wrap w-11/12 h-auto md:w-9/12`}>
          {itemsBtnShopping.map((el) => (
            <TouchableOpacity
              key={el.name}
              style={tw`flex items-center justify-center w-1/4 h-16 bg-white border border-black rounded-md md:h-28`}
              onPress={() => setDescription(el.name)}
            >
              <Image
                source={el.image}
                style={tw`w-1/2 h-3/5`}
              />
              <Text style={tw`text-xs md:text-base`}>{el.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ShoppingScreen
