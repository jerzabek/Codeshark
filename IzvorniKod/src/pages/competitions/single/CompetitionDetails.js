import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getCompetition } from '../../../API'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { COMPETITIONS_SOLVE } from '../../../Routes'

function CompetitionDetails(props) {
  const [competition, setCompetition] = useState()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const { competition_slug } = useParams()

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompetition(competition_slug)

        if (res.success) {
          setCompetition(res.data)

          var start = new Date(res.data.start_time)
          var end = new Date(res.data.end_time)

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
    // TODO
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
          <a href={competition_slug + "/" + COMPETITIONS_SOLVE} className="btn btn-success me-2"><i className="bi bi-play-circle"></i> Participate now!</a>
          <button onClick={apply} className="btn btn-primary"><i className="bi bi-send-plus"></i> Apply for competition</button>
        </div>
        <div className="col-12 col-md-4 col-lg-3 text-md-center mt-3 mt-sm-4 mt-lg-0">
          <p className="text-muted mb-0"><i className="bi bi-calendar-day"></i> {date}</p>
          <p className="text-muted">{time}</p>
        </div>
      </div>
      <p>{competition.comp_text}</p>
    </div>
  );
}

export default CompetitionDetails;