import React, { useContext, useEffect, useState } from 'react'
import { getAvatar } from '../../API';
import { UserContext } from './../../common/UserContext';
import '../../assets/style/common/avatar.css'
import { profileInfo } from '../../API'
import Calendar from 'react-calendar'

function Profile(props) {
  const userContext = useContext(UserContext)
  const defaultAvatar = process.env.REACT_APP_IMAGE_PREFIX + process.env.REACT_APP_DEFAULT_AVATAR

  const [avatar, setAvatar] = useState(defaultAvatar)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [profilePicture, setProfilePicture] = useState()
  const [trophies, setTrophies] = useState()
  const [rank, setRank] = useState('')
  const [attempted, setAttempted] = useState('0')
  const [solved, setSolved] = useState('0')
  const [percentage, setPercentage] = useState('0')

  useEffect(() => {
    // Loading the profile picture
    (async () => {
      try {
        const res = await getAvatar(userContext.user.username)

        console.log(res)

        if (res.success) {
          setAvatar(process.env.REACT_APP_IMAGE_PREFIX + res.data.url)

          document.getElementById('avatar-profile').classList.remove('visually-hidden');
          document.getElementById('avatar-profile-spinner').classList.add('visually-hidden');
        } else {
          document.getElementById('avatar-profile-spinner').classList.add('visually-hidden');
        }

        let data = {
          korisnickoime: userContext.user.username
        }
        const res2 = await profileInfo(data)

        console.log(res2)

        if (res2.success) {
          setFirstname(res2.data.ime)
          setLastname(res2.data.prezime)
          setProfilePicture(res2.data.slikaprofila_url)
          setTrophies(res2.data.trophies)
          setRank(res2.data.titula)
          setAttempted(res2.data.pokusano_zad)
          setSolved(res2.data.uspjesno_zad)
          setPercentage(res2.data.postotak_uspjesnih)
        }

      } catch (err) {
        console.log(err)
        document.getElementById('avatar-profile-spinner').classList.add('visually-hidden');
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
    <div className='container py-4'>
      <div className="row">
        <div className="col-12 col-md-2 col-lg-3">
          <div className="flex-justify-content-center avatar-container">
            <div className="spinner-grow" role="status" id="avatar-profile-spinner">
              <span className="visually-hidden">Loading...</span>
            </div>
            <img src={avatar} onError={(e) => {
              if (!e.target.src.includes(defaultAvatar)) {
                // So that it doesnt keep spamming if the default avatar is not available
                e.target.onerror = null; e.target.src = defaultAvatar
              }
            }} alt="Avatar" id="avatar-profile" className='avatar rounded-circle visually-hidden' />
          </div>
        </div>
        <div className="col-12 col-md-10 col-lg-9">
          <h1 className='mb-2'>Your profile (rank {rank})</h1>
          <h2>Currently logged in as {userContext.user.username}</h2>
          <div><button>Change Profile Picture</button></div>
        </div>
      </div>
    </div>
    <div className="container py-4">
      <div><h2>Profile Info:</h2></div>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6">
          <div className="container py-2">
            <div className="row">
              <div className="col-12 col-md-10 col-lg-9"><b>First Name: </b>{firstname}</div>
              <div className="col-12 col-md-2 col-lg-3"><button>Edit</button></div>
            </div>
          </div>
          <div className="container py-2">
            <div className="row">
              <div className="col-12 col-md-10 col-lg-9"><b>Last Name: </b>{lastname}</div>
              <div className="col-12 col-md-2 col-lg-3"><button>Edit</button></div>
            </div>
          </div>
          <div className="container py-2">
            <div className="row">
              <div className="col-12 col-md-10 col-lg-9"><b>Username: </b>{userContext.user.username}</div>
              <div className="col-12 col-md-2 col-lg-3">{(rank === "admin") && <button>Edit</button>}</div>
            </div>
          </div>
          <div className="container py-2">
            <div className="col-12 col-md-10 col-lg-9"><b>Rank: </b>{rank}</div>
          </div>
          <div className="container py-2">
            <div className="row">
              <div className="col-12 col-md-10 col-lg-9"><b>Email: </b></div>
              <div className="col-12 col-md-2 col-lg-3">{(rank === "admin") && <button>Edit</button>}</div>
            </div>
          </div>
          <div className="container py-2"><b>Trophies: </b>{trophies}</div>
          <div className="container py-2"><b>Percentage of solved problems: </b>{Number((percentage * 100).toFixed(1))}<b>%</b></div>
          <div className="container py-2"><button>Change Password</button></div>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <Calendar/>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Profile;