import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Entypo } from 'react-native-vector-icons'
import tw from 'twrnc'
import useUsersStore from '../stores/userStore'
import { useEffect, useState } from 'react'
import { ButtonGroup, ItemUser, UserForm } from '../components'
import { useToast } from 'react-native-toast-notifications'
import { supabase } from '../lib/supabase'
import useAuthStore from '../stores/authStore'
import { SafeAreaView } from 'react-native-safe-area-context'

FlatListHeaderList = () => (
  <View
    elevation={5}
    style={styles.headerList}
  >
    <View style={tw`flex flex-row w-full h-6 px-3`}>
      <Text style={tw`w-[45%] text-sm font-bold`}>Nombre de usuario</Text>
      <Text style={tw`w-[35%] text-center text-sm font-bold`}>Rol</Text>
    </View>
  </View>
)

const AdminUser = ({ navigation }) => {
  const [user, setUser] = useState(null)
  const users = useUsersStore((state) => state.users)
  const getUsers = useUsersStore((state) => state.getUsers)
  const register = useAuthStore((state) => state.register)
  const toast = useToast()

  useEffect(() => {
    getUsers()
  }, [])

  const handleSave = async (data) => {
    try {
      if (!user?.id) {
        const newUser = await register({
          ...data
        })

        await getUsers()
        toast.show('Usuario creado', { type: 'success' })
      } else {
        const { error } = await supabase
          .from('profiles')
          .update({ username: data.username, role: data.role })
          .eq('id', user.id)
        if (error) throw error
        await getUsers()
        toast.show('Usuario modificado', { type: 'success' })
        setUser(null)
      }
    } catch (error) {
      Alert.alert('Error', error.message, [{ text: 'Aceptar' }])
      return
    }
  }

  const handleDelete = (user) => {
    try {
      const userAdmin = users?.filter((el) => el.role === 'ADMIN')
      if (userAdmin.length > 1 || user.role !== 'ADMIN') {
        Alert.alert('Eliminar', '¿Seguro que desea eliminar el usuario?', [
          {
            text: 'No'
          },
          {
            text: 'Si',
            onPress: async () => {
              const { error } = await supabase.rpc('deleteUser', { userid: user.id })
              if (error) throw error
              await getUsers()
            }
          }
        ])
      } else
        Alert.alert('Error', 'No se puede dejar la App sin usuarios Administradores', [
          { text: 'Aceptar' }
        ])
    } catch (error) {
      Alert.alert('Error', JSON.stringify({ error }, null, 2))
    }
  }

  return (
    <SafeAreaView style={tw`flex items-center w-full h-full gap-4`}>
      <View style={tw`flex items-center justify-end w-full h-16 bg-teal-700`}>
        <View style={tw`flex flex-row items-center justify-between w-full`}>
          <Entypo
            name='chevron-left'
            color='white'
            size={32}
            style={tw`self-center`}
            onPress={() => navigation.goBack()}
          />
          <Text style={tw`text-xl font-semibold text-white`}>Administración de usuarios</Text>
          <Text />
        </View>
      </View>
      <UserForm
        login={false}
        setUser={setUser}
        user={user}
        handleSave={handleSave}
      />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ItemUser
            item={item}
            setUser={setUser}
            deleteUser={handleDelete}
          />
        )}
        ListHeaderComponent={FlatListHeaderList}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={<View style={tw`w-full h-[1px] bg-black`} />}
        keyExtractor={(item) => item.id}
        style={tw`border border-black h-60`}
      />
    </SafeAreaView>
  )
}
export default AdminUser

const styles = StyleSheet.create({
  headerList: {
    justifyContent: 'flex-end',
    height: 30,
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
