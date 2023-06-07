import { FlatList, StyleSheet, ScrollView, View, Text } from 'react-native'
import { ItemSale } from '../components'
import useMovementsStore from '../stores/movementsStore'
import useAuthStore from '../stores/authStore'
import tw from '../lib/tailwind'
import { SafeAreaView } from 'react-native-safe-area-context'

FlatListHeaderSales = () => (
  <View
    elevation={5}
    style={styles.header}
  >
    <Text
      style={tw`pb-2 text-2xl font-bold text-center text-teal-600 underline md:text-4xl md:mt-2`}
    >
      Listado de ventas
    </Text>

    <View style={tw`flex flex-row items-center w-full h-6 px-1 md:mb-1`}>
      <Text style={tw`w-[15%] text-xs md:text-base font-bold md:text-center`}>Operación</Text>
      <Text style={tw`w-[25%] text-right pr-14 text-xs md:text-base font-bold md:text-center`}>
        Usuario
      </Text>
      <Text
        style={tw`w-[38%] text-right pr-14 text-xs md:text-base font-bold md:text-center md:pl-20`}
      >
        Importe
      </Text>
      <Text style={tw`w-[20%] text-left text-xs md:text-base font-bold`}>Hora</Text>
    </View>
  </View>
)

const SalesListingScreen = () => {
  const sales = useMovementsStore((state) => state.sales)
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  return (
    <SafeAreaView>
      <FlatList
        data={sales}
        renderItem={({ item }) => (
          <ItemSale
            role={profile.role}
            item={item}
          />
        )}
        ListHeaderComponent={FlatListHeaderSales}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={<View style={tw`w-full h-[1px] bg-black`} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default SalesListingScreen

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-end',
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    border: 2.9,
    borderColor: 'black',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 1,
    shadowRadius: 7.49
  }
})
