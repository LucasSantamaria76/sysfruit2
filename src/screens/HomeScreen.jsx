import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { itemsTypesSales } from './../items'
import tw from 'twrnc'
import { SimpleLineIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect } from 'react'
import useAuthStore from '../stores/authStore'
import useMovementsStore from '../stores/movementsStore'
import { supabase } from '../lib/supabase'
import { formatDate } from '../lib/formatDate'

const HomeScreen = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout)
  const { day, date, getMovements, getSales } = useMovementsStore((state) => ({
    getMovements: state.getMovements,
    day: state.id,
    getSales: state.getSales,
    date: state.date
  }))

  useEffect(() => {
    getMovements().catch((err) => console.error('error => ', err))
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sales'
        },
        () => getSales()
      )
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [day])

  const closeApp = async () => {
    await logout()
    //BackHandler.exitApp()
  }

  return (
    <SafeAreaView>
      <View style={tw`flex flex-row items-center justify-between w-full h-16 px-3 bg-teal-700`}>
        <SimpleLineIcons
          name='logout'
          size={20}
          color='#ef4444'
          onPress={closeApp}
        />
        <View style={tw`flex items-center justify-center h-16`}>
          <Text style={tw`text-lg text-white`}>Sistema de Ventas</Text>
          <Text style={tw`text-white`}>{formatDate}</Text>
        </View>
        <MaterialCommunityIcons
          name='cash-register'
          size={24}
          color='#fca5a5'
          onPress={() => {
            navigation.navigate('AmountEntry', { typeOfPayment: 'Cambio en caja' })
          }}
        />
      </View>
      <View style={tw`flex items-center h-full gap-3 p-5`}>
        {itemsTypesSales.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => {
              navigation.navigate('AmountEntry', { typeOfPayment: item.name })
            }}
            style={styles.card}
          >
            <Image
              source={item.image}
              resizeMode='contain'
              style={tw`w-2/5 h-16`}
            />
            <Text style={tw`text-2xl font-bold text-teal-500`}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: '#000',
    elevation: 5
  }
})
