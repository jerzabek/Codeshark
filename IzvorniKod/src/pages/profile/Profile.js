import React, { useContext, useEffect, useState } from 'react'
import { getAvatar } from '../../API';
import { UserContext } from './../../common/UserContext';
import '../../assets/style/common/avatar.css'
import { profileInfo } from '../../API'

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
          <h1 className='mb-2'>Your profile</h1>
          <h2>Currently logged in as {userContext.user.username}</h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;