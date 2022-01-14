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

function getTasks() {
  return axiosInstance.get('tasks')
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [404].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function profileInfo(username) {
  return axiosInstance.get(`members/${username}`)
    .then((res) => {
      if ([400, 401].includes(res.status)) throw new Error(res.data.error)
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [400, 401].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function getTask(slug, username) {
  return axiosInstance.get(`task/${slug}`, {
    headers: {
      session: username
    }
  })
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [404].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function getCompetition(competition_slug) {
  return axiosInstance.get(`competition/${competition_slug}`)
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [403].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function getVirtualCompetition(competition_id) {
  return axiosInstance.get(`virtual_competition/${competition_id}`)
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [403].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function startVirtualRandomCompetition(numOfTasks, username) {
  return axiosInstance.post('virtual_competition', {
    task_count: numOfTasks
  }, {
    headers: {
      'session': username
    }
  })
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [413, 400].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

// Based as in based off of a real competition
function startVirtualBasedCompetition(competition_slug) {
  return axiosInstance.post(`virtual_competition/${competition_slug}`)
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [413, 400].includes(err.response.status)) return handleError(err.response.data.error)
      return handleError()
    })
}

function getVirtualCompetitions(username) {
  return axiosInstance.get(`virtual_competitions`, {
    headers: {
      'session': username
    }
  }).then((res) => {
    return handleSuccess(res.data)
  }).catch(err => {
    if (err && err.response && [403].includes(err.response.status)) return handleError(err.response.data.error)
    return handleError()
  })
}

function executeTask(data) {
  return axiosInstance.post('execute_task', data)
    .then((res) => {
      return handleSuccess(res.data)
    }).catch(err => {
      if (err && err.response && [413, 400].includes(err.response.status)) return handleError(err.response.data.error)
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

function loadUsers() {
  return axiosInstance.get('users').then((res) => {
    return handleSuccess(res.data)
  }).catch(err => {
    if (err && err.response && [400].includes(err.response.status)) return handleError(err.response.data.error)
    return handleError()
  })
}

function getHomeContests() {
  return axiosInstance.get('').then((res) => {
    return handleSuccess(res.data)
  }).catch(err => {
    if (err && err.response && [400].includes(err.response.status)) return handleError(err.response.data.error)
    return handleError()
  })
}

function createTask(data, username) {
  return axiosInstance.post(`create_task`, data, {
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

export {
  login,
  register,
  verifyAccount,
  getAvatar,
  getCompetitions,
  getCompetition,
  setupCreateCompetition,
  createCompetition,
  loadUsers,
  getHomeContests,
  profileInfo,
  getTasks,
  getTask,
  executeTask,
  createTask,
  getVirtualCompetitions,
  getVirtualCompetition,
  startVirtualRandomCompetition,
  startVirtualBasedCompetition
}