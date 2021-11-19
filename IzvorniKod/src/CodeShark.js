import { useState } from 'react'
import Header from './common/Header'
import Login from './pages/account/Login'
import { useCookies } from 'react-cookie'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { HOME, LOGIN, LOGOUT, PROFILE, REGISTER } from './Routes'
import PrivateRoute from './PrivateRoute'
import Home from './pages/home/Home'
import { UserContext } from './common/UserContext'
import Profile from './pages/profile/Profile'
import Logout from './common/Logout'
import Register from './pages/account/Register'

function CodeShark() {
  const SESSION_STORAGE_USER = 'user'

  const [cookies, setCookie, removeCookie] = useCookies([SESSION_STORAGE_USER]);
  const [user, setUser] = useState(getUser());

  function getUser() {
    return cookies[SESSION_STORAGE_USER]
  }

  function login(user) {
    // 2592000 seconds = 30 days
    setCookie(SESSION_STORAGE_USER, user, { maxAge: 2592000 })
    setUser(user)
  }

  function logout() {
    removeCookie(SESSION_STORAGE_USER)
    setUser(null)
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user
      }}>
        <Header />

        <main>
            <Routes>
              <Route path={LOGIN} exact element={<Login login={login} />} />
              <Route path={LOGOUT} exact element={<Logout logout={logout} />} />
              <Route path={REGISTER} exact element={<Register />} />
              <Route path={HOME} exact element={<Home />} />

              <Route path={PROFILE} element={
                <PrivateRoute isAuth={user}>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
        </main>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default CodeShark;
