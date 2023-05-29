import { SalesListingScreen, ShoppingScreen } from './../screens'
import StackSales from './../navigation/StackSales'
import StackAdmin from '../navigation/StackAdmin'

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
    component: ShoppingScreen
  },
  {
    name: 'ellipsis-horizontal',
    component: StackAdmin
  }
]
