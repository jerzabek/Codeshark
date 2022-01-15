import React, { useContext, useEffect, useState, useRef } from 'react'
import { getAvatar } from '../../API';
import { UserContext } from './../../common/UserContext';
import { useParams, useNavigate } from 'react-router'
import '../../assets/style/common/avatar.css'
import { PROFILE, EDIT_PROFILE, MEMBERS } from '../../Routes';
import { profileInfo, editProfile } from '../../API'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const MySwal = withReactContent(Swal)

function Profile(props) {
  const userContext = useContext(UserContext)
  const defaultAvatar = process.env.REACT_APP_IMAGE_PREFIX + process.env.REACT_APP_DEFAULT_AVATAR

  const [avatar, setAvatar] = useState(defaultAvatar)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [ownerUsername, setOwnerUsername] = useState('')
  const [visitorUsername, setVisitorUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState()
  const [newProfilePicture, setNewProfilePicture] = useState()
  const [trophies, setTrophies] = useState()
  const [ownerRank, setOwnerRank] = useState('0')
  const [visitorRank, setVisitorRank] = useState('0')
  const [changedRank, setChangedRank] = useState('0')
  // eslint-disable-next-line no-unused-vars
  const [level, setLevel] = useState('')
  const [attempted, setAttempted] = useState('0')
  const [solved, setSolved] = useState('0')
  const [percentage, setPercentage] = useState('0')
  const [solutionUploads, setSolutionUploads] = useState()
  const [organizedCompetitions, setOrganizedCompetitions] = useState()
  const [taskUploads, setTaskUploads] = useState([])

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

  const { username } = useParams()
  const navigate = useNavigate()
  const hiddenRef = useRef(null)

  const [fNameClicked, setFNameClicked] = useState(false)
  const [lNameClicked, setLNameClicked] = useState(false)
  const [usernameClicked, setUsernameClicked] = useState(false)
  const [rankClicked, setRankClicked] = useState(false)
  const [emailClicked, setEmailClicked] = useState(false)
  const [passwordClicked, setPasswordClicked] = useState(false)
  const [pfpClicked, setPfpClicked] = useState(false)
  const [taskData, setTaskData] = useState([]);
  const [sortType, setSortType] = useState('name');

  function formSubmit(e) {
    e.preventDefault()
    const editProfileData = new FormData();

    editProfileData.append("fromuser", ownerUsername);

    if (props.visitor === true)
      editProfileData.append("foruser", username);
  
    editProfileData.append("name", firstname);
    editProfileData.append("last_name", lastname);

    if (password !== '')
      editProfileData.append("password", password);

    if (ownerRank === 3) {
      editProfileData.append("email", email);

      if (changedRank !== '0')
        editProfileData.append("rank", changedRank);

      if (props.visitor === false)
        editProfileData.append("username", ownerUsername);
      else
        editProfileData.append("username", visitorUsername);
    }
    if (pfpClicked && newProfilePicture !== profilePicture)
      editProfileData.append("pfp_url", newProfilePicture);

    const attemptProfileEdit = async () => {
      try {
        const res = await editProfile(editProfileData, userContext.user.session)

        if (res.success) {
          MySwal.fire({
            title: <p>Successfully edited profile!</p>,
            icon: 'success'
          }).then(() => (props.visitor === false) ?
          window.location.href = PROFILE : window.location.href = MEMBERS + "/" + username)
        } else {
          MySwal.fire({
            title: <p>Could not edit profile!</p>,
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
    attemptProfileEdit()
  }

  useEffect(() => {
    // Loading the profile picture
    (async () => {
      try {
        let res = await getAvatar(userContext.user.username)

        if (props.visitor === true)
          res = await getAvatar(username)

        console.log(res)

        if (res.success) {
          setAvatar(process.env.REACT_APP_IMAGE_PREFIX + res.data.pfp_url)

          document.getElementById('avatar-profile').classList.remove('visually-hidden');
          document.getElementById('avatar-profile-spinner').classList.add('visually-hidden');
        } else {
          document.getElementById('avatar-profile-spinner').classList.add('visually-hidden');
        }
        setOwnerUsername(userContext.user.username)
        const owner = await profileInfo(userContext.user.username)

        if (owner.success) {
          setFirstname(owner.data.name)
          setLastname(owner.data.last_name)
          setProfilePicture(owner.data.pfp_url)
          setNewProfilePicture(owner.data.pfp_url)
          setEmail(owner.data.email)
          setTrophies(owner.data.trophies)
          setOwnerRank(owner.data.rank)
          setLevel(owner.data.title)
          setAttempted(owner.data.attempted)
          setSolved(owner.data.solved)
          setPercentage(owner.data.correctly_solved)
          setSolutionUploads(owner.data.submitted_solutions)
          setOrganizedCompetitions(owner.data.created_competitions)
          setTaskUploads(owner.data.created_tasks)
        }
        if (props.visitor === true) {
          const visitor = await profileInfo(username)
          setVisitorUsername(username)

          if (visitor.success) {
            setFirstname(visitor.data.name)
            setLastname(visitor.data.last_name)
            setProfilePicture(visitor.data.pfp_url)
            setNewProfilePicture(owner.data.pfp_url)
            setEmail(visitor.data.email)
            setTrophies(visitor.data.trophies)
            setVisitorRank(visitor.data.rank)
            setLevel(visitor.data.title)
            setAttempted(visitor.data.attempted)
            setSolved(visitor.data.solved)
            setPercentage(visitor.data.correctly_solved)
            setSolutionUploads(visitor.data.submitted_solutions)
            setOrganizedCompetitions(visitor.data.created_competitions)
            setTaskUploads(visitor.data.created_tasks)
          }
        }

      } catch (err) {
        console.log(err)
        document.getElementById('avatar-profile-spinner').classList.add('visually-hidden');
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClickEvent(str) {
    if (props.visitor === true) navigate(MEMBERS + "/" + username + "/" + EDIT_PROFILE)
    else navigate(PROFILE + "/" + EDIT_PROFILE)

    if (str === "fn") setFNameClicked(true)
    else if (str === "ln") setLNameClicked(true)
    else if (str === "us") setUsernameClicked(true)
    else if (str === "rk") setRankClicked(true)
    else if (str === "em") setEmailClicked(true)
    else if (str === "ps") setPasswordClicked(true)
    else if (str === "pf") {
      setPfpClicked(true)
      hiddenRef.current.click();
    }
  }

  function resolveRender(str) {
    if (str === "fn") {
      if (!fNameClicked) return firstname
      else return <input type="text" className="form-control" name="firstname" placeholder={firstname}
                  value={firstname} onChange={(e) => setFirstname(e.target.value)} required></input>
    } else if (str === "ln") {
      if (!lNameClicked) return lastname
      else return <input type="text" className="form-control" name="lastname" placeholder={lastname}
                  value={lastname} onChange={(e) => setLastname(e.target.value)} required></input>
    } else if (str === "us") {
      if (!usernameClicked) return (props.visitor === false) ? ownerUsername : visitorUsername
      else return <input type="text" className="form-control" name="username"
                  placeholder={(props.visitor === false) ? ownerUsername : visitorUsername}
                  value={(props.visitor === false) ? ownerUsername : visitorUsername}
                  onChange={(e) => (props.visitor === false) ? setOwnerUsername(e.target.value) : setVisitorUsername(e.target.value)}
                  required></input>
    } else if (str === "rk") {
      if (!rankClicked) return (props.visitor === true) ? (visitorRank === 1) ? "Competitor" :
                                                          (visitorRank === 2) ? "Leader" :
                                                          "Admin" :
                                                          (ownerRank === 1) ? "Competitor" :
                                                          (ownerRank === 2) ? "Leader" :
                                                          "Admin"
      else return <div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="rank" id="competitor" value={1}
                    checked={visitorRank === 1 && changedRank === '0' || changedRank === '1'}
                    onChange={(e) => setChangedRank(e.target.value)}></input>
                    <label className="form-check-label" htmlFor="competitor">Competitor</label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="rank" id="leader" value={2}
                    checked={visitorRank === 2 && changedRank === '0' || changedRank === '2'}
                    onChange={(e) => setChangedRank(e.target.value)}></input>
                    <label className="form-check-label" htmlFor="leader">Leader</label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="rank" id="admin" value={3}
                    checked={(visitorRank === 3 || props.visitor === false) && changedRank === '0' || changedRank === '3'}
                    onChange={(e) => setChangedRank(e.target.value)}></input>
                    <label className="form-check-label" htmlFor="admin">Admin</label>
                    </div>
                  </div>
    } else if (str === "em") {
      if (!emailClicked) return email
      else return <input type="text" className="form-control" name="email" placeholder={email}
                  value={email} onChange={(e) => setEmail(e.target.value)} required></input>
    }
  }

  function renderUploadedSolutions() {
    var rows = [];
    for (var i = 0; i < solutionUploads.length; i++) {
      rows.push(<tr key={solutionUploads[i].submitted_time}>
        <td style={cells}>{solutionUploads[i].task_name}</td>
        <td style={cells}>{solutionUploads[i].submitted_solution}</td>
        <td style={cells}>{solutionUploads[i].passed}</td>
        <td style={cells}>{solutionUploads[i].submitted_time}</td>
        <td style={cells}>{solutionUploads[i].avg_exe_time}</td>
      </tr>)
    }
    return <tbody>{rows}</tbody>;
  }

  function renderCompetitions() {
    var rows = [];
    for (var i = 0; i < organizedCompetitions.length; i++) {
      var image = process.env.REACT_APP_TROPHY_PREFIX + organizedCompetitions[i].trophy_img
      rows.push(<tr key={organizedCompetitions[i].comp_slug}>
        <td style={cells}>{organizedCompetitions[i].comp_slug}</td>
        <td style={cells}>{organizedCompetitions[i].comp_name}</td>
        <td style={cells}>{organizedCompetitions[i].start_time}</td>
        <td style={cells}>{organizedCompetitions[i].end_time}</td>
        <td style={cells}><img src={image} width="30" height="30" alt="Competition trophy"></img></td>
        <td style={cells}>{organizedCompetitions[i].task_count}</td>
        <td style={cells}>{organizedCompetitions[i].comp_class_name}</td>
      </tr>)
    }
    return <tbody>{rows}</tbody>;
  }

  function renderUploadedTasks() {
    var rows = [];
    if (taskData.length === 0) {
      for (var i = 0; i < taskUploads.length; i++) {
        rows.push(<tr key={taskUploads[i].slug}>
          <td style={cells}>{taskUploads[i].slug}</td>
          <td style={cells}>{taskUploads[i].name}</td>
          <td style={cells}>{taskUploads[i].difficulty}</td>
        </tr>)
      }
    } else {
      for (var i = 0; i < taskData.length; i++) {
        rows.push(<tr key={taskData[i].slug}>
          <td style={cells}>{taskData[i].slug}</td>
          <td style={cells}>{taskData[i].name}</td>
          <td style={cells}>{taskData[i].difficulty}</td>
        </tr>)
      }
    }
    return <tbody>{rows}</tbody>;
  }

  useEffect(() => {
    function sortArray(type) {
      const types = {
        name: 'name',
        difficulty: 'difficulty'
      };
      const sortProperty = types[type];
      const sorted = [...taskUploads].sort((a, b) => a[sortProperty] - b[sortProperty]);
      setTaskData(sorted);
    }
    sortArray(sortType);
  }, [sortType])

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
              {(props.visitor === false) ? <h1 className='mb-2'>Your profile {(ownerRank === 3) && <span>(admin)</span>}</h1>
              : <h1 className='mb-2'>Profile page {(visitorRank === 3) && <span>(admin)</span>}</h1>}
            </div>
            <div className="container py-2">
              {(props.visitor === false) ? <h2>Currently logged in as {ownerUsername}</h2>
              : <h2>Currently viewing {visitorUsername}'s profile</h2>}
            </div>
            <div className="container py-2">
            {(props.visitor === false || ownerRank === 3) &&
              <button type="button" className="btn btn-primary btn-lg"
              onClick={() => handleClickEvent("pf")}>Change Profile Picture</button>}
              <input type="file" style={{display:'none'}} name="profilePicture" className="form-control" id="profilePicture"
              accept="image/png, image/jpeg, image/jpg" ref={hiddenRef}
              onChange={(e) => setNewProfilePicture(e.target.files[0])}/>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6"><h2><u>Profile Info:</u></h2></div>
          <div className="col-12 col-md-6 col-lg-6"><h2><u>Scheduled Competitions:</u></h2></div>
        </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
            <form id="profile-edit-form" onSubmit={formSubmit}>
              <div className="container py-2">
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-9"><b>First Name: </b>{resolveRender("fn")}</div>
                  <div className="col-12 col-md-2 col-lg-3">
                    {(props.visitor === false || ownerRank === 3) &&
                    <button type="button" className="btn btn-primary btn-sm"
                    onClick={() => handleClickEvent("fn")}>Edit</button>}
                  </div>
                </div>
              </div>
              <div className="container py-2">
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-9"><b>Last Name: </b>{resolveRender("ln")}</div>
                  <div className="col-12 col-md-2 col-lg-3">
                    {(props.visitor === false || ownerRank === 3) &&
                    <button type="button" className="btn btn-primary btn-sm"
                    onClick={() => handleClickEvent("ln")}>Edit</button>}
                  </div>
                </div>
              </div>
              <div className="container py-2">
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-9"><b>Username: </b>{resolveRender("us")}</div>
                  <div className="col-12 col-md-2 col-lg-3">
                    {(ownerRank === 3) &&
                    <button type="button" className="btn btn-primary btn-sm"
                    onClick={() => handleClickEvent("us")}>Edit</button>}
                  </div>
                </div>
              </div>
              <div className="container py-2">
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-9"><b>Rank: </b>{resolveRender("rk")}</div>
                  <div className="col-12 col-md-2 col-lg-3">
                    {(ownerRank === 3) &&
                    <button type="button" className="btn btn-primary btn-sm"
                    onClick={() => handleClickEvent("rk")}>Edit</button>}
                  </div>
                </div>
              </div>
              <div className="container py-2">
                <div className="row">
                  <div className="col-12 col-md-10 col-lg-9"><b>Email: </b>{resolveRender("em")}</div>
                  <div className="col-12 col-md-2 col-lg-3">
                    {(ownerRank === 3) &&
                    <button type="button" className="btn btn-primary btn-sm"
                    onClick={() => handleClickEvent("em")}>Edit</button>}
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
              <div className="container py-2"><b>Tasks solved / attempted: </b>{solved} / {attempted}</div>
              <div className="container py-2"><b>Percentage of solved problems: </b>{Number((percentage * 100).toFixed(1))}<b>%</b></div>
              {(props.visitor === false || ownerRank === 3)  &&
                <div className="container py-2">
                  <div className="row">
                    <div className="col-12 col-md-7 col-lg-7">
                      {(!passwordClicked) ? <button type="button" className="btn btn-primary"
                      onClick={() => handleClickEvent("ps")}>Change Password</button>
                      : <input type="text" className="form-control" name="password" placeholder="Your new password"
                      value={password} onChange={(e) => setPassword(e.target.value)} required></input>}
                    </div>
                    <div className="col-12 col-md-5 col-lg-5">
                      <button type="submit" id="edit-profile-button" className="btn btn-success"
                      disabled={!(fNameClicked || lNameClicked || usernameClicked ||
                      rankClicked || emailClicked || passwordClicked || pfpClicked)}>Save Changes</button>
                    </div>
                  </div>
                </div>}
            </form>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <Calendar className="container py-4" />
            </div>
          </div>
        </div>
      <div>
        {(solutionUploads !== undefined && solutionUploads.length !== 0) ?
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
                  {renderUploadedSolutions()}
                </table>
              </div>
            </div>
          </div> : (props.visitor === true && visitorRank === 1 || props.visitor === false && ownerRank === 1) ?
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
                      <th style={cells}>Competition Slug</th>
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
          </div> : (props.visitor === true && visitorRank !== 1 || props.visitor === false && ownerRank !== 1) ?
            <div className="container py-4">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <h2>There are no organized competitions.</h2>
                </div>
              </div>
            </div> : <div></div>}
      </div>
      <div>
        {(taskUploads !== undefined && taskUploads.length !== 0) ?
          <div className="container py-4">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <h2><u>All uploaded tasks:</u></h2>
                <div style={{textAlign: "right"}}>Sort by:
                  <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="difficulty">Difficulty</option>
                  </select>
                </div>
                <table style={tables}>
                  <thead>
                    <tr>
                      <th style={cells}>Task Slug</th>
                      <th style={cells}>Task Name</th>
                      <th style={cells}>Difficulty</th>
                    </tr>
                  </thead>
                  {renderUploadedTasks()}
                </table>
              </div>
            </div>
          </div> : (props.visitor === true && visitorRank !== 1 || props.visitor === false && ownerRank !== 1) ?
            <div className="container py-4">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <h2>There are no uploaded tasks.</h2>
                </div>
              </div>
            </div> : <div></div>}
      </div>
    </React.Fragment>
  );
}

export default Profile;