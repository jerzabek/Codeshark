import React, { useState } from 'react';
import { login } from '../../API'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HOME } from '../../Routes';

const MySwal = withReactContent(Swal)

function Login({ login: loginUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function formSubmit(e) {
    e.preventDefault()

    let loginData = {
      korisnickoime: username,
      lozinka: password
    }

    const attemptLogin = async () => {
      try {
        const res = await login(loginData)

        if (res.success) {
          loginUser({ username })

          MySwal.fire({
            title: <p>Successfully signed in!</p>,
            icon: 'success'
          }).then(() => window.location.href = HOME)
        } else {
          MySwal.fire({
            title: <p>Could not sign in!</p>,
            html: <p>{res.error}</p>,
            icon: 'error'
          })
        }
      } catch (err) {
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
    <div>
      <h1>Sign into your account</h1>
      <form id="registration-form" onSubmit={formSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" name="username" placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required></input>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
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
          <div className="col-12 col-md-6 col-lg-4">
            <div className="float-end">
              <button type="submit" className="btn btn-success"><i class="bi bi-door-open"></i> Sign in</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;