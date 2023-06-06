import { FlatList, StyleSheet, ScrollView, View, Text } from 'react-native'
import { ItemPurchase } from '../components'
import useMovementsStore from '../stores/movementsStore'
import useAuthStore from '../stores/authStore'
import { Entypo } from 'react-native-vector-icons'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'

const PurchasesListingScreen = ({ navigation }) => {
  const purchases = useMovementsStore((state) => state.purchases)
  const { profile } = useAuthStore((state) => ({ profile: state.profile }))

  FlatListHeader = () => (
    <View
      elevation={5}
      style={styles.header}
    >
      <View style={tw`flex flex-row items-center justify-between w-full h-full px-3 pt-5`}>
        <Entypo
          name='chevron-left'
          style={tw`text-teal-600`}
          size={32}
          onPress={() => navigation.goBack()}
        />
        <Text style={tw`text-2xl font-bold text-teal-600`}>Listado de salidas</Text>
        <Text />
      </View>
    </View>
  )

  return (
    <SafeAreaView>
      <FlatList
        data={purchases}
        renderItem={({ item }) => (
          <ItemPurchase
            role={profile.role}
            item={item}
          />
        )}
        ListHeaderComponent={FlatListHeader}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={<View style={tw`w-full h-[1px] bg-black`} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default PurchasesListingScreen

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
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
