import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useAuthStore = create((set) => ({
  sesion: null,
  profile: null,
  loading: false,
  setSession: (session) => set({ session }),
  login: async (email, password) => {
    if (!email) return Promise.reject('El nombre de usuario es requerido')
    if (!password) return Promise.reject('La contraseña  es requerida')

    set({ loading: true })
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.session.user.id)

    const errors = error || profileError

    if (errors) return Promise.reject(errors)

    set({ profile: profileData[0], session: data.session, loading: false })

    return Promise.resolve(data.user)
  },
  register: async ({ email, password, username, role }) => {
    if (!email) return Promise.reject('El nombre de usuario es requerido')
    if (!password) return Promise.reject('La contraseña  es requerida')

    set({ loading: true })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role, username } }
    })
    if (error) return Promise.reject(error)

    set({ session: data.session, loading: false })

    return Promise.resolve(data.user)
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) return Promise.reject(error)
    set({ session: null })
    return Promise.resolve()
  }
}))

export default useAuthStore
