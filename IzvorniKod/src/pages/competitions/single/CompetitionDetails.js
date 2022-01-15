import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { applyToCompetition, finishCompetition, getCompetition, startVirtualBasedCompetition } from '../../../API'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { COMPETITIONS_SOLVE, MEMBERS, VIRTUAL_COMPETITIONS } from '../../../Routes'
import { UserContext } from '../../../common/UserContext'
import { useNavigate } from 'react-router'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { ADMIN_RANK, LEADER_RANK } from '../../../Constants'

const MySwal = withReactContent(Swal)

function CompetitionDetails(props) {
  const userContext = useContext(UserContext)

  const [competition, setCompetition] = useState()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [canMakeVirtual, setCanMakeVirtual] = useState(false)
  const [canParticipate, setCanParticipate] = useState(false)
  const [canApply, setCanApply] = useState(true)
  const [canFinishCompetition, setCanFinishCompetition] = useState(false)

  const { competition_slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompetition(competition_slug, userContext.user.session)

        if (res.success) {
          setCompetition(res.data)

          var start = new Date(res.data.start_time)
          var end = new Date(res.data.end_time)
          var currDate = new Date();

          if (res.data.is_applied) {
            setCanApply(false)
          }

          if (end < currDate) {
            setCanMakeVirtual(true)
          }

          if (start < currDate && currDate < end) {
            if (res.data.is_applied) {
              setCanParticipate(true)
            }
          }

          if (userContext.user.rank === ADMIN_RANK || (userContext.user.rank === LEADER_RANK && userContext.user.username === res.data.author_username)) {
            if (end < currDate && !res.data.is_finished) {
              setCanFinishCompetition(true)
            }
          }

          if (start !== end) {
            setDate(start.toLocaleDateString("hr") + " - " + end.toLocaleDateString("hr"))
          }

          setTime(start.toLocaleTimeString("hr") + " - " + end.toLocaleTimeString("hr"))
        }
      } catch (err) {
        console.log(err)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function apply() {
    (async () => {
      try {
        const res = await applyToCompetition(competition_slug, userContext.user.session)

        if (res.success) {
          MySwal.fire({
            title: <p>You're in!</p>,
            html: <p>Successfully applied to competition.</p>,
            icon: 'success'
          })
        } else {
          MySwal.fire({
            title: <p>Oops!</p>,
            html: <p>{res.error}</p>,
            icon: 'warning'
          })
        }
      } catch (err) {
        console.log(err)
      }
    })();
  }

  function startVirtual() {
    (async () => {
      try {
        const res = await startVirtualBasedCompetition(competition_slug, userContext.user.session)

        if (res.success) {
          navigate(VIRTUAL_COMPETITIONS + "/" + res.data.virtual_id)
        } else {
          MySwal.fire({
            title: <p>Could not start practice competition!</p>,
            html: <p>Unfortunately we encountered an error on our server, please try again later.</p>,
            icon: 'error'
          })
        }
      } catch (err) {
        console.log(err)
      }
    })();
  }

  function endCompetition() {
    (async () => {
      try {
        const res = await finishCompetition(competition_slug, userContext.user.session)

        if (res.success) {
          MySwal.fire({
            title: <p>Successfully ended competition!</p>,
            html: <p>All trophies have been awarded and the competition came to an end.</p>,
            icon: 'success'
          })
        } else {
          MySwal.fire({
            title: <p>Could not end competition</p>,
            html: <p>{res.error}</p>,
            icon: 'error'
          })
        }
      } catch (err) {
        console.log(err)
      }
    })();
  }

  // eslint-disable-next-line eqeqeq
  if (competition == undefined) {
    return (
      <div className="container py-4">
        <p className="text-center text-muted">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 col-sm-4 col-lg-2">
          <img className="align-self-center img-fluid" src={process.env.REACT_APP_TROPHY_PREFIX + competition.trophy_img} alt="Competition trophy" />
        </div>
        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
          <h1>{competition.comp_name}</h1>
          <p className="text-muted"><i className="bi bi-person-circle"></i> Author: {competition.author_name}</p>
          <p className="text-muted"><i className="bi bi-file-bar-graph"></i> Competition class: {competition.comp_class_name}</p>
          {
            canParticipate && (
              <a href={competition_slug + "/" + COMPETITIONS_SOLVE} className="btn btn-success"><i className="bi bi-play-circle"></i> Participate now!</a>
            )
          }
          {
            canApply && (
              <button onClick={apply} className="btn btn-primary ms-2"><i className="bi bi-send-plus"></i> Apply for competition</button>
            )
          }
          {
            canMakeVirtual && (
              <button onClick={startVirtual} className="btn btn-primary ms-2"><i className="bi bi-cloud-plus"></i> Start virtual competition</button>
            )
          }
          {
            canFinishCompetition && (
              <button onClick={endCompetition} className="btn btn-danger ms-2"><i class="bi bi-slash-circle"></i> Finish competition</button>
            )
          }
        </div>
        <div className="col-12 col-md-4 col-lg-3 text-md-center mt-3 mt-sm-4 mt-lg-0">
          <p className="text-muted mb-0"><i className="bi bi-calendar-day"></i> {date}</p>
          <p className="text-muted">{time}</p>
        </div>
      </div>
      <p>{competition.comp_text}</p>
      {
        competition?.is_finished && (
          <div className="row mt-4">
            <h4>Leaderboards for this competition</h4>
            {
              competition.leaderboards.length > 0 ? (
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <td>Username</td>
                      <td>Score</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {competition && competition.leaderboards.map(row =>
                      <tr key={row.username}>
                        <td><Link to={MEMBERS + "/" + row.username} className='badge bg-info'>{row.username}</Link></td>
                        <td>{row.score}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted">No participants found :(</p>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default CompetitionDetails;