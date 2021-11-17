import React, { useState } from 'react';
import { register } from '../../API';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HOME } from '../../Routes';

const MySwal = withReactContent(Swal)

function Register() {
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [level, setLevel] = useState('')

  function formSubmit(e) {
    e.preventDefault()

    let registrationData = {
      korisnickoime: username,
      slikaprofila: "juan.png",
      lozinka: password,
      ime: firstname,
      prezime: lastname,
      email: email,
      titula: '',
      nivouprava: level
    }

    const attemptRegistration = async () => {
      try {
        const res = await register(registrationData)

        if (res.success) {
          MySwal.fire({
            title: <p>Successfully completed registration!</p>,
            icon: 'success'
          }).then(() => window.location.href = HOME)
        } else {
          MySwal.fire({
            title: <p>Could not complete registration!</p>,
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

    attemptRegistration()
  }

  return (
    <div>
      <h1>Register</h1>
      <form id="registration-form" onSubmit={formSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" name="username" placeholder="example.username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required></input>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">First name</label>
              <input type="text" className="form-control" name="firstname" placeholder="First name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required></input>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Last name</label>
              <input type="text" className="form-control" name="lastname" placeholder="Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required></input>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail address</label>
              <input type="email" className="form-control" name="email" placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="confirm" className="form-label">Confirm password</label>
              <input type="password" className="form-control" name="confirm" placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required></input>
            </div>
          </div>
        </div>

        <p>Type of account:</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="level" id="competitor"
            checked={level === '1'}
            onChange={(e) => setLevel(e.target.value)}
            value="1"></input>
          <label className="form-check-label" htmlFor="competitor">Competitor</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="radio" name="level" id="leader"
            checked={level === '2'}
            onChange={(e) => setLevel(e.target.value)}
            value="2"></input>
          <label className="form-check-label" htmlFor="leader">Competition leader</label>
        </div>

        <div className="row">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="float-end">
              <button type="submit" className="btn btn-success"><i className="bi bi-person-plus"></i> Register</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;