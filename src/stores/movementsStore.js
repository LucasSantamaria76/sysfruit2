import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { formatInTimeZone } from 'date-fns-tz'
import { totals } from '../lib/totals'

const initialState = {
  id: '',
  cashAvailable: 0,
  cashChange: 0,
  date: '',
  cashWithdrawals: [],
  purchases: [],
  sales: []
}

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

      const { data: purchases, errorPurchases } = await supabase
        .from('purchases')
        .select('*')
        .eq('day', movementsOfTheDay[0].id)

      const errors = error || errorPurchases
      if (errors) return Promise.reject(errors)

      set({
        purchases,
        sales,
        cashAvailable:
          movementsOfTheDay[0].cashChange +
          (totals(sales)['Efectivo'].amount || 0) -
          (totals(purchases)['Efectivo'].amount || 0)
      })
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
    set({
      sales,
      cashAvailable:
        get().cashChange +
        (totals(sales)['Efectivo'].amount || 0) -
        (totals(get().purchases)['Efectivo'].amount || 0)
    })
    return Promise.resolve()
  },
  getPurchases: async () => {
    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('day', get().id)
      .order('created_at', { ascending: false })
    if (error) return Promise.reject(error)
    set({
      purchases,
      cashAvailable:
        get().cashChange +
        (totals(get().sales)['Efectivo'].amount || 0) -
        (totals(purchases)['Efectivo'].amount || 0)
    })
    return Promise.resolve()
  }
}))

export default useMovementsStore
