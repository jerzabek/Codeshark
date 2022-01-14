import { useState } from 'react'
import Header from './common/Header'
import Login from './pages/account/Login'
import { useCookies } from 'react-cookie'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { COMPETITIONS, CREATE, EMAIL_VERIFICATION, HOME, LOGIN, LOGOUT, PROFILE, EDIT_PROFILE, REGISTER, MEMBERS, PROBLEMS, TASK } from './Routes'
import PrivateRoute from './PrivateRoute'
import Home from './pages/home/Home'
import { UserContext } from './common/UserContext'
import Profile from './pages/profile/Profile'
import Logout from './common/Logout'
import Register from './pages/account/Register'
import EmailVerification from './pages/account/EmailVerification'
import Competitions from './pages/competitions/Competitions'
import CreateCompetition from './pages/competitions/CreateCompetition'
import Competition from './pages/competitions/single/Competition'
import Members from './pages/members/Members'
import Problems from "./pages/problems/Problems"
import Task from "./pages/problems/Task"

function CodeShark() {
  const SESSION_STORAGE_USER = 'user'

  const [cookies, setCookie, removeCookie] = useCookies([SESSION_STORAGE_USER])
  const [user, setUser] = useState(getUser())

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
            <Route path={EMAIL_VERIFICATION}>
              <Route path=':token' element={<EmailVerification />} />

              <Route path="" element={<Navigate to={HOME} />} />
            </Route>
            <Route path={LOGIN} exact element={<Login login={login} isAuth={user} />} />
            <Route path={LOGOUT} exact element={<Logout logout={logout} />} />
            <Route path={REGISTER} exact element={<Register isAuth={user} />} />
            <Route path={HOME} exact element={<Home />} />

            <Route path={PROFILE}>
              <Route path={EDIT_PROFILE} element={
                <PrivateRoute isAuth={user}>
                  <Profile visitor={false}/>
                </PrivateRoute>
              } />

              <Route path="" element={
                <PrivateRoute isAuth={user}>
                  <Profile visitor={false}/>
                </PrivateRoute>
              } />
            </Route>

            <Route path={MEMBERS}>
              <Route path={":username"}>
                <Route path={EDIT_PROFILE} element={
                  <PrivateRoute isAuth={user}>
                    <Profile visitor={true}/>
                  </PrivateRoute>
                } />

                <Route path="" element={
                  <PrivateRoute isAuth={user}>
                    <Profile visitor={true}/>
                  </PrivateRoute>
                } />
              </Route>

              <Route path="" element={
                <PrivateRoute isAuth={user}>
                  <Members />
                </PrivateRoute>
              } />
            </Route>

            <Route path={COMPETITIONS}>
              <Route path={CREATE} element={
                <PrivateRoute isAuth={user}>
                  <CreateCompetition />
                </PrivateRoute>
              } />

              <Route path={":competition_id"} element={
                <PrivateRoute isAuth={user}>
                  <Competition />
                </PrivateRoute>
              } />

              <Route path="" element={
                <PrivateRoute isAuth={user}>
                  <Competitions />
                </PrivateRoute>
              } />
            </Route>

            <Route path={TASK + '/:handle'} element={
              <PrivateRoute isAuth={user}>
                <Task />
              </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to={HOME} />} />

            <Route path={PROBLEMS} element={
              <PrivateRoute isAuth={user}>
                <Problems />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default CodeShark;
