import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getCompetition } from '../../../API'
import 'bootstrap-icons/font/bootstrap-icons.css'

function Competition(props) {
  const [competition, setCompetition] = useState()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const { competition_id } = useParams()

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompetition(competition_id)

        console.log(res)

        if (res.success) {
          setCompetition(res.data)

          var start = new Date(res.data.vrijeme_poc)
          var end = new Date(res.data.vrijeme_kraj)

          setDate(start.toLocaleDateString("hr"))
          setTime(start.toLocaleTimeString("hr") + " - " + end.toLocaleTimeString("hr"))
        }
      } catch (err) {
        console.log(err)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function apply() {
    console.log('ok')
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
          <img className="align-self-center img-fluid" src={process.env.REACT_APP_TROPHY_PREFIX + competition.slika_trofeja} alt="Competition trophy" />
        </div>
        <div className="col-12 col-sm-8 col-md-8 col-lg-8">
          <h1>{competition.ime_natjecanja}</h1>
          <p className="text-muted"><i class="bi bi-person-circle"></i> Author: {competition.ime_prezime_autora}</p>
          <p className="text-muted"><i class="bi bi-file-bar-graph"></i> Competition class: {competition.ime_klase_natjecanja}</p>
          <button onClick={apply} className="btn btn-success"><i class="bi bi-send-plus"></i> Apply for competition</button>
        </div>
        <div className="col-12 col-md-4 col-lg-2 text-md-center mt-3 mt-sm-4 mt-lg-0">
          <p className="text-muted mb-0"><i class="bi bi-calendar-day"></i> {date}</p>
          <p className="text-muted">{time}</p>
        </div>
      </div>

      <p>{competition.tekst_natjecanja}</p>

    </div>
  );
}

export default Competition;