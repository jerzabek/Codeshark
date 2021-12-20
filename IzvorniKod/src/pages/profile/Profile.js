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
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [profilePicture, setProfilePicture] = useState()
  const [trophies, setTrophies] = useState()
  const [rank, setRank] = useState('0')
  const [level, setLevel] = useState('')
  const [attempted, setAttempted] = useState('0')
  const [solved, setSolved] = useState('0')
  const [percentage, setPercentage] = useState('0')
  const [taskUploads, setTaskUploads] = useState()
  const [organizedCompetitions, setOrganizedCompetitions] = useState()

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
        setUsername(userContext.user.username)

        const res2 = await profileInfo(userContext.user.username)

        if (res2.success) {
          setFirstname(res2.data.ime)
          setLastname(res2.data.prezime)
          setProfilePicture(res2.data.slikaprofila_url)
          setEmail(res2.data.email)
          setTrophies(res2.data.trophies)
          setRank(res2.data.rank)
          setLevel(res2.data.titula)
          setAttempted(res2.data.pokusano_zad)
          setSolved(res2.data.uspjesno_zad)
          setPercentage(res2.data.postotak_uspjesnih)
          setTaskUploads(res2.data.submitted_tasks)
          setOrganizedCompetitions(res2.data.created_competitions)
        }

      } catch (err) {
        console.log(err)
        document.getElementById('avatar-profile-spinner').classList.add('visually-hidden');
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderUploads() {
    var rows = [];
    for (var i = 0; i < taskUploads.length; i++) {
        rows.push(<tr key={taskUploads[i].vrijeme_predaje}>
        <td>{taskUploads[i].zadatak_id}</td>
        <td>{taskUploads[i].predano_rjesenje}</td>
        <td>{taskUploads[i].prolaznost}</td>
        <td>{taskUploads[i].vrijeme_predaje}</td>
        <td>{taskUploads[i].prosj_vrijeme_izvrsenja}</td>
      </tr>)
    }
    return <tbody>{rows}</tbody>;
  }

  function renderCompetitions() {
    var rows = [];
    for (var i = 0; i < organizedCompetitions.length; i++) {
        rows.push(<tr key={organizedCompetitions[i].natjecanje_id}>
          <td>{organizedCompetitions[i].natjecanje_id}</td>
          <td>{organizedCompetitions[i].ime_natjecanja}</td>
          <td>{organizedCompetitions[i].vrijeme_pocetak}</td>
          <td>{organizedCompetitions[i].vrijeme_kraj}</td>
          <td>{organizedCompetitions[i].slika_trofeja}</td>
          <td>{organizedCompetitions[i].broj_zadataka}</td>
          <td>{organizedCompetitions[i].id_klase_natjecanja}</td>
        </tr>)
    }
    return <tbody>{rows}</tbody>;
  }

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
          <h1 className='mb-2'>Your profile (rank {level})</h1>
          <h2>Currently logged in as {userContext.user.username}</h2>
          <div><button>Change Profile Picture</button></div>
        </div>
      </div>
    </div>
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6"><h2>Profile Info:</h2></div>
        <div className="col-12 col-md-6 col-lg-6"><h2>Calendar:</h2></div>
      </div>
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
              <div className="col-12 col-md-10 col-lg-9"><b>Username: </b>{username}</div>
              <div className="col-12 col-md-2 col-lg-3">{(rank === 3) && <button>Edit</button>}</div>
            </div>
          </div>
          <div className="container py-2">
            <div className="col-12 col-md-10 col-lg-9"><b>Rank: </b>{level}</div>
          </div>
          <div className="container py-2">
            <div className="row">
              <div className="col-12 col-md-10 col-lg-9"><b>Email: </b>{email}</div>
              <div className="col-12 col-md-2 col-lg-3">{(rank === 3) && <button>Edit</button>}</div>
            </div>
          </div>
          {trophies !== undefined ?
          <div className="container py-2">
            <b>Trophies: </b>            
          </div> :
          <div className="container py-2">
            <b>Trophies: </b>No trophies
          </div>}
          <div className="container py-2"><b>Percentage of solved problems: </b>{Number((percentage * 100).toFixed(1))}<b>%</b></div>
          <div className="container py-2"><button>Change Password</button></div>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <Calendar className="container py-4"/>
        </div>
      </div>
    </div>
    <div>
      {(taskUploads !== undefined && taskUploads.length !== 0) ?
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <h2>All uploaded solutions:</h2>
            <table>
              <thead>
              <tr>
                <th>Task ID</th>
                <th>Uploaded Solution</th>
                <th>Result</th>
                <th>Time of Upload</th>
                <th>Execution Time</th>
              </tr>
              </thead>
              {renderUploads()}
            </table>
          </div>
        </div>
      </div> : (rank === 1) ?
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <h2>There are no uploaded solutions.</h2>
          </div>
        </div>
      </div> : <div></div>}
    </div>
    <div>
      {(organizedCompetitions !== undefined && organizedCompetitions.length !== 0) ?
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <h2>All organized competitions:</h2>
            <table>
              <thead>
                <tr>
                  <th>Competition ID</th>
                  <th>Competition Name</th>
                  <th>Starting Time</th>
                  <th>Ending Time</th>
                  <th>Trophy Image</th>
                  <th>Number of Tasks</th>
                  <th>Competition Class ID</th>
                </tr>
              </thead>
              {renderCompetitions()}
            </table>
          </div>
        </div>
      </div> : (rank !== 1) ?
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <h2>There are no organized competitions.</h2>
          </div>
        </div>
      </div> : <div></div>}
    </div>
    </React.Fragment>
  );
}

export default Profile;