import { intlFormat } from 'date-fns'

export const formatDate = intlFormat(
  Date.now(),
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
