import { SalesListingScreen } from './../screens'
import StackSales from './../navigation/StackSales'
import StackAdmin from '../navigation/StackAdmin'
import StackPurchases from '../navigation/StackPurchases'

export const itemsTab = [
  {
    name: 'home',
    component: StackSales
  },
  {
    name: 'list',
    component: SalesListingScreen
  },
  {
    name: 'cart',
    component: StackPurchases
  },
  {
    name: 'ellipsis-horizontal',
    component: StackAdmin
  }
]
