import { Alert, View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Fontisto, Entypo } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import { es } from 'date-fns/locale'
import { supabase } from './../lib/supabase'
import { AR } from '../constant'
import { PrintTotalsPurchases, PrintTotalsSales } from '../components'
import { formatPrice } from '../lib/formatPrice'
import { total } from '../lib/totals'
import Select from 'react-native-select-dropdown'
import useUsersStore from '../stores/userStore'
import tw from '../lib/tailwind'

const getMovements = async (date) => {
  try {
    const { data, error } = await supabase
      .from('movementsOfTheDay')
      .select(
        `    
    sales (
      amount,typeOfPayment,userId
    ),
    purchases (
      amount,typeOfPayment,userId
    )
  `
      )
      .eq('date', date)
    if (error) throw new Error(error)
    return data
  } catch (error) {
    Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }])
  }
}

const MovementsPerDay = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [day, setDay] = useState(formatInTimeZone(Date.now(), AR, 'dd-MM-yyyy'))
  const [sales, setSales] = useState([])
  const [purchases, setPurchases] = useState([])
  const getUsers = useUsersStore((state) => state.getUsers)
  const [users, setUsers] = useState([{ name: 'Todos', id: '' }])
  const [filterUser, setFilterUser] = useState('')

  useEffect(() => {
    setUsers([{ name: 'Todos', id: '' }])
    getUsers().then((list) => {
      let listUsers = list.map((el) => ({ name: el.username, id: el.id }))
      setUsers((prev) => [...prev, ...listUsers])
    })
  }, [])

  useEffect(() => {
    setSales([])
    setPurchases([])
    getMovements(day)
      .then((data) => {
        data?.forEach((el) => {
          if (el.sales?.length) {
            const sales = filterUser
              ? el.sales?.reduce((acc, val) => {
                  if (val.userId === filterUser) acc = [...acc, val]
                  return acc
                }, [])
              : el.sales
            setSales(sales)
          }
          el.purchases?.length && setPurchases((prev) => [...prev, ...el.purchases])
        })
      })
      .catch((error) => Alert.alert('Error', error?.message || error, [{ text: 'Aceptar' }]))
  }, [day, filterUser])

  return (
    <SafeAreaView>
      <View
        elevation={5}
        style={styles.header}
      >
        <View style={tw`flex flex-row items-center justify-between w-full px-3 h-1/2`}>
          <Entypo
            name='chevron-left'
            style={tw`text-teal-600`}
            size={32}
            onPress={() => navigation.goBack()}
          />
          <Text style={tw`text-2xl font-bold text-teal-600 md:text-4xl md:m-2`}>
            Movimientos por día
          </Text>
          <Text />
        </View>
        <View style={tw`flex flex-row justify-evenly`}>
          <View
            style={tw`flex flex-row items-center self-center justify-between w-3/5 border-b border-black md:w-1/2`}
          >
            <TextInput
              value={formatInTimeZone(
                day.split('-').reverse().join('-'),
                AR,
                "eeee, dd ' de' MMMM yyyy",
                {
                  locale: es
                }
              )}
              style={tw`text-lg font-bold text-orange-800 md:text-2xl`}
              editable={false}
            />
            <Fontisto
              name='date'
              size={22}
              color='black'
              onPress={() => setDatePickerVisibility(true)}
            />
          </View>
          <Select
            data={users}
            onSelect={(sel) => setFilterUser(sel.id)}
            defaultButtonText='Seleccionar usuario'
            defaultValueByIndex={0}
            buttonTextAfterSelection={(selectedItem) => selectedItem.name}
            rowTextForSelection={(item, index) => item.name}
            buttonStyle={tw`h-8 bg-transparent border-b border-black w-30 md:h-10 md:w-40`}
            buttonTextStyle={tw`text-sm font-bold md:text-3xl`}
            dropdownStyle={tw`rounded-lg`}
            rowStyle={tw`h-7 md:h-10`}
            rowTextStyle={tw`text-sm font-bold md:text-2xl`}
            selectedRowStyle={tw`bg-teal-600`}
            selectedRowTextStyle={tw`font-bold text-white`}
            renderDropdownIcon={(isOpened) => {
              return (
                <Entypo
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#000'}
                  size={18}
                />
              )
            }}
            dropdownIconPosition={'right'}
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={(date) => {
            setDatePickerVisibility(false)
            setDay(formatInTimeZone(date, AR, 'dd-MM-yyyy'))
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
      <ScrollView>
        <PrintTotalsSales sales={sales} />

        <PrintTotalsPurchases purchases={purchases} />

        <View style={tw`flex flex-row items-center justify-between p-2 border-b-2 border-teal-600`}>
          <Text style={tw`text-2xl font-bold md:text-3xl md:m-1`}>Diferencia</Text>
          <Text style={tw`text-2xl font-bold text-red-500 md:text-3xl`}>
            {formatPrice(total(sales) - total(purchases))}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MovementsPerDay

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    height: 100,
    width: '100%',
    backgroundColor: 'white',
    border: 2.9,
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16
    },
    paddingBottom: 5,
    shadowOpacity: 1,
    shadowRadius: 7.49
  }
})
