export const totals = (array) =>
  array.reduce((totals, item) => {
    !totals[item.typeOfPayment] && (totals[item.typeOfPayment] = { amount: 0, quantity: 0 })

    totals[item.typeOfPayment] = {
      amount: totals[item.typeOfPayment].amount + (item.amount || 0),
      quantity: totals[item.typeOfPayment].quantity + 1
    }
    return totals
  }, {})

export const total = (array) => array.reduce((sum, item) => sum + (item.amount || 0), 0)
