import { intlFormat } from 'date-fns'

export const formatDate = (date) =>
  intlFormat(
    date,
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    {
      locale: 'es-AR'
    }
  )
