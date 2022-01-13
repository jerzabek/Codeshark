import React, { useContext, useEffect, useState } from 'react'
import { getAvatar } from '../../API';
import { UserContext } from './../../common/UserContext';
import '../../assets/style/common/avatar.css'
import { profileInfo } from '../../API'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function Profile(props) {
  const userContext = useContext(UserContext)
  const defaultAvatar = process.env.REACT_APP_IMAGE_PREFIX + process.env.REACT_APP_DEFAULT_AVATAR

  const [avatar, setAvatar] = useState(defaultAvatar)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [profilePicture, setProfilePicture] = useState()
  const [trophies, setTrophies] = useState()
  const [rank, setRank] = useState('0')
  const [level, setLevel] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [attempted, setAttempted] = useState('0')
  // eslint-disable-next-line no-unused-vars
  const [solved, setSolved] = useState('0')
  const [percentage, setPercentage] = useState('0')
  const [taskUploads, setTaskUploads] = useState()
  const [organizedCompetitions, setOrganizedCompetitions] = useState()

  const tables = {
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    width: "100%"
  }

  const cells = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px"
  }

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
          setFirstname(res2.data.name)
          setLastname(res2.data.last_name)
          setProfilePicture(res2.data.pfp_url)
          setEmail(res2.data.email)
          setTrophies(res2.data.trophies)
          setRank(res2.data.rank)
          setLevel(res2.data.title)
          setAttempted(res2.data.attempted)
          setSolved(res2.data.solved)
          setPercentage(res2.data.correctly_solved)
          setTaskUploads(res2.data.submitted_solutions)
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
      rows.push(<tr key={taskUploads[i].submitted_time}>
        <td style={cells}>{taskUploads[i].task_name}</td>
        <td style={cells}>{taskUploads[i].submitted_solution}</td>
        <td style={cells}>{taskUploads[i].result}</td>
        <td style={cells}>{taskUploads[i].submitted_time}</td>
        <td style={cells}>{taskUploads[i].avg_exe_time}</td>
      </tr>)
    }
    return <tbody>{rows}</tbody>;
  }

  function renderCompetitions() {
    var rows = [];
    for (var i = 0; i < organizedCompetitions.length; i++) {
      var image = process.env.REACT_APP_TROPHY_PREFIX + organizedCompetitions[i].trophy_img
      rows.push(<tr key={organizedCompetitions[i].comp_id}>
        <td style={cells}>{organizedCompetitions[i].comp_id}</td>
        <td style={cells}>{organizedCompetitions[i].comp_name}</td>
        <td style={cells}>{organizedCompetitions[i].start_time}</td>
        <td style={cells}>{organizedCompetitions[i].end_time}</td>
        <td style={cells}><img src={image} width="30" height="30" alt="Competition trophy" on></img></td>
        <td style={cells}>{organizedCompetitions[i].task_length}</td>
        <td style={cells}>{organizedCompetitions[i].comp_class_name}</td>
      </tr>)
    }
    return <tbody>{rows}</tbody>;
  }

  function renderTrophies() {
    var rows = []
    for (var i = 0; i < trophies.length; i++) {
      var image = process.env.REACT_APP_TROPHY_PREFIX + trophies[i].trophy_img
      rows.push(<div key={trophies[i].trophy_name} className="container py-2">
        <img src={image} width="30" height="30" alt="Competition trophy"></img>
        {trophies[i].trophy_name}
      </div>)
    }
    return <div>{rows}</div>;
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
            <div className="container py-2">
              <h1 className='mb-2'>Your profile {(rank === 3) && <span>(admin)</span>}</h1>
            </div>
            <div className="container py-2">
              <h2>Currently logged in as {userContext.user.username}</h2>
            </div>
            <div className="container py-2">
              <button type="button" className="btn btn-primary btn-lg">Change Profile Picture</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6"><h2><u>Profile Info:</u></h2></div>
          <div className="col-12 col-md-6 col-lg-6"><h2><u>Your Competitions:</u></h2></div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="container py-2">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-9"><b>First Name: </b>{firstname}</div>
                <div className="col-12 col-md-2 col-lg-3">
                  <button type="button" className="btn btn-primary btn-sm">Edit</button>
                </div>
              </div>
            </div>
            <div className="container py-2">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-9"><b>Last Name: </b>{lastname}</div>
                <div className="col-12 col-md-2 col-lg-3">
                  <button type="button" className="btn btn-primary btn-sm">Edit</button>
                </div>
              </div>
            </div>
            <div className="container py-2">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-9"><b>Username: </b>{username}</div>
                <div className="col-12 col-md-2 col-lg-3">
                  {(rank === 3) && <button type="button" className="btn btn-primary btn-sm">Edit</button>}
                </div>
              </div>
            </div>
            <div className="container py-2">
              <div className="col-12 col-md-10 col-lg-9"><b>Rank: </b>{level}</div>
            </div>
            <div className="container py-2">
              <div className="row">
                <div className="col-12 col-md-10 col-lg-9"><b>Email: </b>{email}</div>
                <div className="col-12 col-md-2 col-lg-3">
                  {(rank === 3) && <button type="button" className="btn btn-primary btn-sm">Edit</button>}
                </div>
              </div>
            </div>
            {trophies !== undefined && trophies.length !== 0 ?
              <div className="container py-2">
                <b>Trophies: </b>
                {renderTrophies()}
              </div> :
              <div className="container py-2">
                <b>Trophies: </b>No trophies
              </div>}
            <div className="container py-2"><b>Percentage of solved problems: </b>{Number((percentage * 100).toFixed(1))}<b>%</b></div>
            <div className="container py-2">
              <button type="button" className="btn btn-primary">Change Password</button>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <Calendar className="container py-4" />
          </div>
        </div>
      </div>
      <div>
        {(taskUploads !== undefined && taskUploads.length !== 0) ?
          <div className="container py-4">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <h2><u>All uploaded solutions:</u></h2>
                <table style={tables}>
                  <thead>
                    <tr>
                      <th style={cells}>Task name</th>
                      <th style={cells}>Uploaded solution</th>
                      <th style={cells}>Result</th>
                      <th style={cells}>Time of upload</th>
                      <th style={cells}>Execution time</th>
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
                <h2><u>All organized competitions:</u></h2>
                <table style={tables}>
                  <thead>
                    <tr>
                      <th style={cells}>Competition ID</th>
                      <th style={cells}>Competition Name</th>
                      <th style={cells}>Starting Time</th>
                      <th style={cells}>Ending Time</th>
                      <th style={cells}>Trophy Image</th>
                      <th style={cells}>Number of Tasks</th>
                      <th style={cells}>Competition Class Name</th>
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