import axios from 'axios'
import { getToken, setToken, tokenIsValid } from './auth'

const axiosAuth = axios.create()

axiosAuth.interceptors.request.use(async function (config) {
  if (!tokenIsValid('collect-refresh-token')) {
    if (tokenIsValid('collect-refresh-token')) {
      const { data } = await axios.post('/api/auth/refresh/', {
        refresh: getToken('collect-refresh-token'),
      })
      setToken('collect-refresh-token', data.access)
    } else {
      throw new axios.Cancel('Your session has expired, please sign in.')
    }
  }
  config.headers.Authorization = `Bearer ${getToken('collect-refresh-token')}`
  return config
})

export default axiosAuth