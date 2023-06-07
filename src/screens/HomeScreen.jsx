import { Alert, BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { itemsTypesSales } from './../items'
import tw from '../lib/tailwind'
import { SimpleLineIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect } from 'react'
import useAuthStore from '../stores/authStore'
import useMovementsStore from '../stores/movementsStore'
import { supabase } from '../lib/supabase'
import { formatDate } from '../lib/formatDate'

const HomeScreen = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout)
  const { day, date, getCashWithdrawals, getMovements, getPurchases, getSales } = useMovementsStore(
    (state) => ({
      getMovements: state.getMovements,
      day: state.id,
      getSales: state.getSales,
      getPurchases: state.getPurchases,
      getCashWithdrawals: state.getCashWithdrawals,
      date: state.date
    })
  )

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
        () =>
          getSales().catch((error) =>
            Alert.alert('Error', JSON.stringify(error, null, 2), [{ text: 'Aceptar' }])
          )
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'purchases'
        },
        () =>
          getPurchases().catch((error) =>
            Alert.alert('Error', JSON.stringify(error, null, 2), [{ text: 'Aceptar' }])
          )
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cashWithdrawals'
        },
        () =>
          getCashWithdrawals().catch((error) =>
            Alert.alert('Error', JSON.stringify(error, null, 2), [{ text: 'Aceptar' }])
          )
      )
      .subscribe()
    return () =>
      supabase
        .removeChannel(channel)
        .catch((error) =>
          Alert.alert('Error', JSON.stringify(error, null, 2), [{ text: 'Aceptar' }])
        )
  }, [day])

  const closeApp = async () => {
    await logout()
    //BackHandler.exitApp()
  }

  return (
    <SafeAreaView>
      <View
        style={tw`flex flex-row items-center justify-between w-full h-16 px-3 bg-teal-700 md:h-24`}
      >
        <SimpleLineIcons
          name='logout'
          size={32}
          color='#ef4444'
          onPress={closeApp}
        />
        <View style={tw`flex items-center justify-center h-16`}>
          <Text style={tw`text-xl text-white md:text-4xl`}>Sistema de Ventas</Text>
          <Text style={tw`text-white md:text-xl`}>{formatDate(Date.now())}</Text>
        </View>
        <MaterialCommunityIcons
          name='cash-register'
          size={50}
          color='#ef4444'
          onPress={() => {
            navigation.navigate('AmountEntry', { typeOfPayment: 'Cambio en caja' })
          }}
        />
      </View>
      <View style={tw`flex items-center w-full h-full gap-3 p-5 mx-auto md:w-4/5`}>
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
              style={tw`w-2/5 h-14 md:h-24`}
            />
            <Text style={tw`text-2xl font-bold text-teal-500 md:text-5xl`}>{item.name}</Text>
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
