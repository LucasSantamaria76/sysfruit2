import cash from '../../assets/images/money.android.png'
import dni from '../../assets/images/DNI.android.jpg'
import credit from '../../assets/images/credit.android.png'
import debit from '../../assets/images/debit.android.png'
import mp from '../../assets/images/mp.android.png'
import transfer from '../../assets/images/transfer.png'
import modo from '../../assets/images/modo.png'
import { CASH, CREDIT, CUENTA_DNI, DEBIT, MERCADO_PAGO, MODO, TRANSFER } from '../constant'

export const itemsTypesSales = [
  {
    name: CASH,
    image: cash
  },
  {
    name: CUENTA_DNI,
    image: dni
  },
  {
    name: DEBIT,
    image: debit
  },
  {
    name: CREDIT,
    image: credit
  },
  {
    name: MERCADO_PAGO,
    image: mp
  },
  {
    name: TRANSFER,
    image: transfer
  },
  {
    name: MODO,
    image: modo
  }
]

export const typeOfPayment = (type) => {
  switch (type) {
    case CUENTA_DNI:
      return dni
    case MERCADO_PAGO:
      return mp
    case DEBIT:
      return debit
    case CREDIT:
      return credit
    case CASH:
      return cash
    case MODO:
      return modo
    case TRANSFER:
      return transfer
  }
}
