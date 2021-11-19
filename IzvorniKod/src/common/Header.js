import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PROFILE, LOGIN, LOGOUT, HOME, REGISTER } from '../Routes'
import { UserContext } from './UserContext'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from '../assets/images/logo-black.png'

function Header(props) {
  const userContext = useContext(UserContext)

  let isLogged = userContext.user != null

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to={HOME} className='navbar-brand'>
          <img src={logo} alt="CodeShark" height="32" class="d-inline-block align-text-top" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav w-100">
            <NavLink to={HOME} className='nav-link'>Home</NavLink>
            <NavLink to={HOME} className='nav-link'>Problems</NavLink>
            <NavLink to={HOME} className='nav-link'>Leaderboards</NavLink>
            {
              isLogged ?
                <React.Fragment>
                  <NavLink to={PROFILE} className='nav-link ms-lg-auto ms-0'><i className="bi bi-person-circle"></i> Profile</NavLink>
                  <NavLink to={LOGOUT} className='nav-link'><i className="bi bi-box-arrow-left"></i> Logout</NavLink>
                </React.Fragment>
                :
                <React.Fragment>
                  <NavLink to={LOGIN} className='nav-link ms-lg-auto ms-0 text-primary'><i className="bi bi-box-arrow-in-right"></i> Sign in</NavLink>
                  <NavLink to={REGISTER} className='nav-link text-secondary'><i className="bi bi-person-plus"></i> Register</NavLink>
                </React.Fragment>
            }
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;