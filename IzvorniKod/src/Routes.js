// Paths that do not start with / are not absolute paths - they are parts of a larger URL
// e.g. /competitions/:slug/solve  -> COMPETITIONS    :slug     COMPETITIONS_SOLVE
const HOME = '/'
const LOGIN = '/login'
const LOGOUT = '/logout'
const REGISTER = '/register'
const PROFILE = '/profile'
const LEADERBOARDS = '/leaderboards'
const PROBLEMS = '/problems'
const EMAIL_VERIFICATION = '/validate'
const COMPETITIONS = '/competitions'
const COMPETITIONS_SOLVE = 'solve'
const CREATE = 'create'
const MEMBERS = '/members'
const TASK = '/task'

export { HOME, LOGIN, LOGOUT, REGISTER, PROFILE, LEADERBOARDS, PROBLEMS, EMAIL_VERIFICATION, COMPETITIONS, CREATE, TASK, MEMBERS, COMPETITIONS_SOLVE }
