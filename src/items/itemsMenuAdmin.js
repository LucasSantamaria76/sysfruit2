import retiros from '../../assets/images/CajaRegistradora.png'
import dailySummary from '../../assets/images/resumen.png'
import monthlySummary from '../../assets/images/resMensual.png'
import users from '../../assets/images/users.png'
import calendar from '../../assets/images/calendario.png'
import CashWithdrawals from './../screens/CashWithdrawals'
import DailySummary from '../screens/DailySummary'
import MonthlySummary from '../screens/MonthlySummary'
import AdminUser from './../screens/AdminUser'
import MovementsPerDay from './../screens/MovementsPerDay'

export const itemsMenuAdmin = [
  {
    name: 'Retiros de caja',
    image: retiros,
    page: 'cashWithdrawalsScreen',
    screen: CashWithdrawals
  },
  {
    name: 'Resumen del día',
    image: dailySummary,
    page: 'dailySummary',
    screen: DailySummary
  },
  {
    name: 'Resumen mensual',
    image: monthlySummary,
    page: 'monthlySummary',
    screen: MonthlySummary
  },
  {
    name: 'Administración de usuarios',
    image: users,
    page: 'adminUserScreen',
    screen: AdminUser
  },
  {
    name: 'Movimientos por día',
    image: calendar,
    page: 'movementsPerDay',
    screen: MovementsPerDay
  }
]
