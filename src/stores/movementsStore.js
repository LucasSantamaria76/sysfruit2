import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { formatInTimeZone } from 'date-fns-tz'

const initialState = {
  id: '',
  cashAvailable: 0,
  cashChange: 0,
  date: '',
  cashWithdrawals: [],
  purchases: [],
  sales: []
}

const totalSalesCash = (sales) =>
  sales.reduce((total, item) => {
    total += item.typeOfPayment === 'Efectivo' ? item.amount : 0
    return total
  }, 0)

const useMovementsStore = create((set, get) => ({
  ...initialState,
  getMovements: async () => {
    const now = formatInTimeZone(Date.now(), 'America/Argentina/Buenos_Aires', 'dd-MM-yyyy')
    const { data, error } = await supabase.from('movementsOfTheDay').select('*').eq('date', now)

    if (error) return Promise.reject(error)

    let movementsOfTheDay = data

    if (!movementsOfTheDay.length) {
      const { error } = await supabase.from('movementsOfTheDay').insert([{ date: now }])
      if (!error) {
        const { data, error } = await supabase.from('movementsOfTheDay').select('*').eq('date', now)
        movementsOfTheDay = data
      } else return Promise.reject(error)
    } else {
      const { data: sales, error } = await supabase
        .from('sales')
        .select('*')
        .eq('day', movementsOfTheDay[0].id)
        .order('created_at', { ascending: false })
      if (error) return Promise.reject(error)

      set({ sales, cashAvailable: movementsOfTheDay[0].cashChange + totalSalesCash(sales) })
    }

    set({
      id: movementsOfTheDay[0].id,
      cashChange: movementsOfTheDay[0].cashChange,
      date: movementsOfTheDay[0].date
    })
  },
  getSales: async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .eq('day', get().id)
      .order('created_at', { ascending: false })
    if (error) return Promise.reject(error)
    set({ sales, cashAvailable: get().cashChange + totalSalesCash(sales) })
    return Promise.resolve()
  }
}))

export default useMovementsStore
