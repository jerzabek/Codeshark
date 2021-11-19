import * as axios from 'axios'

const baseUrl = 'https://sigma.domefan.club:5000/'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404
})

const handleError = (err) => ({ success: false, error: err.error || err || 'Greška na serveru' })
const handleSuccess = (data) => ({ success: true, data })

function login(data) {
  return axiosInstance.post('login', data)
    .then((res) => {
      if ([400, 401].includes(res.status)) throw new Error(res.data.error)
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [400, 401].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function register(data) {
  return axiosInstance.post('register', data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((res) => {
    if ([400].includes(res.status)) throw new Error(res.data.error)
    return handleSuccess(res.data)
  }).catch(err => {
    if (err && err.response && [400].includes(err.response.status)) return handleError(err.response.data.error)
    return handleError()
  })
}

function verifyAccount(token) {
  return axiosInstance.get(`validate/${token}`)
    .then((res) => {
      if ([400, 401].includes(res.status)) throw new Error(res.data.error)
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [400, 401].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

export {
  login,
  register,
  verifyAccount
}