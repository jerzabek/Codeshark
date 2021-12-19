import React, { useEffect } from 'react'
import { useState } from 'react'
import { getCompetitors } from '../../API'
import CompetitionTable from './CompetitionTable'
import { Link } from 'react-router-dom'
import { CREATE, COMPETITIONS } from '../../Routes'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CompetitionCalender from './CompetitionCalender'

const COMPETITION_TABLE_HEADERS = [
  'Competition name',
  'Start',
  'Finish',
  'Class',
  'Organizer'
]

function Competitions(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loading the profile picture
    (async () => {
      try {
        const res = await getCompetitors()

        setLoading(false);

        if (res.success) {
          setList(res.data)
        } else {
          let mock = []

          for(var i = 0; i < 20; i++) {
            mock.push({naziv: 'abcdef'.charAt(Math.floor(Math.random()*6)), start: 'b', finish: 'c', class: 'd', organizer: 'e'})
          }

          setList(mock)
        }
      } catch (err) {
        console.log(err)
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container py-4'>
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3>Check out ongoing competitions:</h3>
          <Link to={COMPETITIONS + "/" + CREATE} className="btn btn-success"><i className="bi bi-file-earmark-plus"></i> Create new competition</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <CompetitionCalender />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <h3>Search all competitions:</h3>
          <CompetitionTable data={list} columns={COMPETITION_TABLE_HEADERS} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

export default Competitions;