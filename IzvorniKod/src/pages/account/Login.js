import React, { useState } from 'react';
import { login } from '../../API'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HOME } from '../../Routes';
import { Navigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)

function Login({ login: loginUser, isAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (isAuth) {
    return <Navigate to={HOME} />;
  }

  function formSubmit(e) {
    e.preventDefault()

    let loginData = {
      username,
      password
    }

    const attemptLogin = async () => {
      document.getElementById('login-button').classList.add('disabled')
      document.getElementById('login-spinner').classList.remove('visually-hidden')

      try {
        const res = await login(loginData)

        if (res.success) {
          loginUser({ username, rank: res.data.rank, session: res.data.session_id })

          MySwal.fire({
            title: <p>Successfully signed in!</p>,
            icon: 'success'
          }).finally(() => window.location.href = HOME)
        } else {
          MySwal.fire({
            title: <p>Could not sign in!</p>,
            html: <p>{res.error}</p>,
            icon: 'error'
          })
        }

        document.getElementById('login-button')?.classList.remove('disabled')
        document.getElementById('login-spinner')?.classList.add('visually-hidden')
      } catch (err) {
        document.getElementById('login-button')?.classList.remove('disabled')
        document.getElementById('login-spinner')?.classList.add('visually-hidden')

        console.log(err)
        if (typeof err === 'object') {
          MySwal.fire({
            title: <p>An error unknown error occurred :(</p>,
            icon: 'error'
          })

          return
        }

        MySwal.fire({
          title: <p>An error ocurred!</p>,
          html: <p>{err}</p>,
          icon: 'error'
        })
      }
    }

    attemptLogin()
  }
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-4">
          <h1 className='mb-4 text-center'>Sign into your account</h1>
          <hr className="w-75 mx-auto" />
          <form id="registration-form" onSubmit={formSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" name="username" autoComplete="off" placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required></input>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="float-end">
                  <div className="align-middle spinner-border me-3 visually-hidden" role="status" id="login-spinner">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <button type="submit" id="login-button" className="btn btn-success"><i className="bi bi-door-open"></i> Sign in</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;