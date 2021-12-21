import * as axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  validateStatus: (status) => (status >= 200 && status < 300)
})

const handleError = (err) => ({ success: false, error: err?.error || err || 'Greška na serveru' })
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
    return handleSuccess(res.data)
  }).catch(err => {
    if (err && err.response && [413].includes(err.response.status)) return handleError('Profile picture is too large. Size limit is 1 MB.')
    if (err && err.response && [400, 413].includes(err.response.status)) return handleError(err.response.data.error)
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

function getAvatar(username) {
  return axiosInstance.get(`avatar/${username}`)
    .then((res) => {
      if ([404].includes(res.status)) return handleError(res.data)
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [404].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function getCompetitions() {
  return axiosInstance.get(`competitions`)
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [404].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function getCompetition(competition_id) {
  return axiosInstance.get(`competition/${competition_id}`)
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [403].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function setupCreateCompetition(username) {
  return axiosInstance.get(`create_competition`, {
    headers: {
      'session': username
    }
  })
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      return handleError(err)
    })
}

function createCompetition(data) {
  return axiosInstance.post(`create_competition`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then((res) => {
    return handleSuccess(res.data)
  }).catch(err => {
    if (err && err.response && [413, 400].includes(err.response.status)) return handleError(err.response.data.error)
    return handleError()
  })
}

export {
  login,
  register,
  verifyAccount,
  getAvatar,
  getCompetitions,
  getCompetition,
  setupCreateCompetition,
  createCompetition
}