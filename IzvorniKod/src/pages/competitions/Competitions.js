import React, { useEffect, useState, useContext } from 'react'
import { getCompetitions, getVirtualCompetitions } from '../../API'
import CompetitionTable from './CompetitionTable'
import { Link } from 'react-router-dom'
import { CREATE, COMPETITIONS } from '../../Routes'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CompetitionCalender from './CompetitionCalender'
import { UserContext } from './../../common/UserContext';

const COMPETITION_TABLE_HEADERS = [
  '',
  'Competition name',
  'Start',
  'Finish',
  'Class'
]

function Competitions(props) {
  const userContext = useContext(UserContext)

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


    (async () => {
      try {
        const res = await getVirtualCompetitions(userContext.user.username)

        console.log(res)

        // if (res.success) {
        //   setCompetition(res.data)

        //   var start = new Date(res.data.start_time)
        //   var end = new Date(res.data.end_time)

        //   setDate(start.toLocaleDateString("hr"))
        //   setTime(start.toLocaleTimeString("hr") + " - " + end.toLocaleTimeString("hr"))
        // }
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
              <CompetitionCalender events={list} />
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