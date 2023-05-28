import * as dotenv from 'dotenv'

dotenv.config()

export default ({ config }) => ({
  ...config,
  slug: 'sysfruit2',
  name: 'sysfruit2',
  extra: {
    ...config.extra,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY
  }
})
