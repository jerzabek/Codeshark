import React, { useEffect } from 'react'
import { useState } from 'react'
import { getCompetitions } from '../../API'
import CompetitionTable from './CompetitionTable'
import { Link } from 'react-router-dom'
import { CREATE, COMPETITIONS } from '../../Routes'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CompetitionCalender from './CompetitionCalender'

const COMPETITION_TABLE_HEADERS = [
  '',
  'Competition name',
  'Start',
  'Finish',
  'Class'
]

function Competitions(props) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompetitions()

        setLoading(false);

        if (res.success) {
          setList(res.data.competitions)
        }
      } catch (err) {
        console.log(err)
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="bg-dark">
        <div className="container py-4">
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h3 className='text-white'>Check out ongoing competitions:</h3>
              <Link to={COMPETITIONS + "/" + CREATE} className="btn btn-success"><i className="bi bi-file-earmark-plus"></i> Create new competition</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <CompetitionCalender events={list}/>
            </div>
          </div>
        </div>
      </div>
      <div className='container py-4'>
        <div className="row mt-4">
          <div className="col-12">
            <h3>Search all competitions:</h3>
            <CompetitionTable data={list} columns={COMPETITION_TABLE_HEADERS} loading={loading} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Competitions;