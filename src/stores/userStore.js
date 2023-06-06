import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useUsersStore = create((set) => ({
  users: [],
  getUsers: async () => {
    const { data: users, error } = await supabase.from('profiles').select('*')
    if (error) return Promise.reject(error)
    set({ users })
    return Promise.resolve(users)
  }
}))

export default useUsersStore
