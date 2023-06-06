import { useRef, useState, useEffect } from 'react'
import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { inputStyleWithIcons } from '../styles'
import tw from 'twrnc'
import ButtonGroup from './ButtonGroup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const UserForm = ({ login, user, setUser, handleSave }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const schema = yup.object({
    username: !login && yup.string().trim().required('El nombre de usuario es requerido'),
    role: !login && yup.string().required(),
    email:
      !user?.id &&
      yup
        .string()
        .lowercase()
        .trim()
        .required('El correo es requerido')
        .email('Formato de correo incorrecto'),
    password:
      !user?.id &&
      yup
        .string()
        .trim()
        .required('La contraseña es requerida')
        .min(6, 'Longitud mínima 6 caracteres')
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      username: '',
      role: 'OPERATOR',
      email: '',
      password: ''
    },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setValue('username', user?.username || '')
    setValue('role', user?.role || 'OPERATOR')
  }, [user])

  const onSubmit = (data) => {
    handleSave(data)
    Keyboard.dismiss()
    reset()
  }

  const cancelValues = () => {
    reset()
    setUser(null)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={tw`items-center w-11/12 gap-3`}>
        {!login && (
          <>
            <View style={tw``}>
              <View style={inputStyleWithIcons}>
                <MaterialCommunityIcons
                  name='account-outline'
                  size={24}
                  color='black'
                />
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder='Ingrese su nombre de usuario'
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType='next'
                      selectTextOnFocus
                      style={tw`w-11/12 text-xl text-black`}
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        emailRef.current?.focus()
                      }}
                    />
                  )}
                  name='username'
                />
                <Text />
              </View>
              <Text style={tw`self-start text-xs text-red-500`}>
                {errors.username && errors.username.message}
              </Text>
            </View>

            <View>
              <Text style={tw`text-sm`}>Seleccionar Rol</Text>
              <ButtonGroup
                value={user?.role === 'ADMIN' ? 0 : 1}
                setValue={setValue}
                style={tw`justify-between w-full h-12 border border-black rounded-md`}
              >
                <Text style={tw`text-xl`}>Administrador</Text>
                <Text style={tw`text-xl`}>Operador</Text>
              </ButtonGroup>
            </View>
          </>
        )}
        {!user?.id && (
          <>
            <View style={tw``}>
              <View style={inputStyleWithIcons}>
                <MaterialCommunityIcons
                  name='email-edit-outline'
                  size={24}
                  color='black'
                />
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      ref={emailRef}
                      inputMode='email'
                      placeholder='Ingrese su email'
                      style={tw`w-11/12 text-xl text-black`}
                      returnKeyType='next'
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      blurOnSubmit={false}
                      onSubmitEditing={() => {
                        passwordRef.current?.focus()
                      }}
                    />
                  )}
                  name='email'
                />
              </View>
              <Text style={tw`self-start text-xs text-red-500`}>
                {errors.email && errors.email.message}
              </Text>
            </View>

            <View style={tw``}>
              <View style={inputStyleWithIcons}>
                <MaterialCommunityIcons
                  name='account-lock-outline'
                  size={24}
                  color='black'
                />
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      ref={passwordRef}
                      placeholder='Ingrese su contraseña'
                      secureTextEntry={secureTextEntry}
                      style={tw`w-4/5 text-xl text-black`}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      returnKeyType='done'
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                  name='password'
                />
                <MaterialCommunityIcons
                  name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  size={24}
                  color='black'
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              </View>
              <Text style={tw`self-start text-xs text-red-500`}>
                {errors.password && errors.password.message}
              </Text>
            </View>
          </>
        )}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={tw`justify-center w-full h-12 bg-teal-600 rounded-md`}
        >
          <Text style={tw`text-2xl text-center text-white`}>
            {login ? 'Ingresar' : user?.id ? 'Modificar usuario' : 'Crear nuevo usuario'}
          </Text>
        </TouchableOpacity>
        {user?.id && (
          <TouchableOpacity
            onPress={cancelValues}
            style={tw`justify-center w-full h-12 bg-yellow-500 rounded-md`}
          >
            <Text style={tw`text-2xl text-center text-white`}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
export default UserForm
