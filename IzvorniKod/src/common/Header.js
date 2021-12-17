import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PROFILE, LOGIN, LOGOUT, HOME, REGISTER, PROBLEMS } from '../Routes'
import { UserContext } from './UserContext'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from '../assets/images/logo-black.png'
import { getAvatar } from '../API'
import '../assets/style/common/avatar.css'

function Header(props) {
  const userContext = useContext(UserContext)
  const defaultAvatar = process.env.REACT_APP_IMAGE_PREFIX + process.env.REACT_APP_DEFAULT_AVATAR

  const [avatar, setAvatar] = useState(defaultAvatar)

  useEffect(() => {
    // Loading the profile picture
    (async () => {
      try {
        const res = await getAvatar(userContext.user.username)

        if (res.success) {
          setAvatar(process.env.REACT_APP_IMAGE_PREFIX + res.data.url)

          document.getElementById('avatar').classList.remove('visually-hidden');
          document.getElementById('avatar-spinner').classList.add('visually-hidden');
        } else {
          document.getElementById('avatar-spinner').classList.add('visually-hidden');
        }
      } catch (err) {
        document.getElementById('avatar-spinner')?.classList.add('visually-hidden');
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let isLogged = userContext.user != null

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to={HOME} className='navbar-brand'>
          <img src={logo} alt="CodeShark" height="32" className="d-inline-block align-text-top" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav w-100 align-items-baseline">
            <NavLink to={HOME} className='nav-link'>Home</NavLink>
            <NavLink to={PROBLEMS} className='nav-link'>Problems</NavLink>
            <NavLink to={HOME} className='nav-link'>Leaderboards</NavLink>
            {
              isLogged ?
                <React.Fragment>
                  <NavLink to={PROFILE} className='nav-link ms-lg-auto ms-0 align-items-baseline'>
                    <img src={avatar} onError={(e) => {
                      if (!e.target.src.includes(defaultAvatar)) {
                        // So that it doesnt keep spamming if the default avatar is not available
                        e.target.onerror = null; e.target.src = defaultAvatar
                      }
                    }} alt="Avatar" id="avatar" className='avatar-navbar rounded-circle visually-hidden' /> Profile</NavLink>
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