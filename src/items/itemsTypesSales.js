import cash from '../../assets/images/money.android.png'
import dni from '../../assets/images/DNI.android.jpg'
import credit from '../../assets/images/credit.android.png'
import debit from '../../assets/images/debit.android.png'
import mp from '../../assets/images/mp.android.png'

export const itemsTypesSales = [
  {
    name: 'Efectivo',
    image: cash
  },
  {
    name: 'Cuenta DNI',
    image: dni
  },
  {
    name: 'Débito',
    image: debit
  },
  {
    name: 'Crédito',
    image: credit
  },
  {
    name: 'Mercado Pago',
    image: mp
  }
]

export const typeOfPayment = (type) => {
  switch (type) {
    case 'Cuenta DNI':
      return dni
    case 'Mercado Pago':
      return mp
    case 'Débito':
      return debit
    case 'Crédito':
      return credit
    case 'Efectivo':
      return cash
  }
}
