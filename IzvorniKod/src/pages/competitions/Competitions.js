import React, { useEffect, useState, useContext } from 'react'
import { getCompetitions, getVirtualCompetitions, startVirtualRandomCompetition } from '../../API'
import CompetitionTable from './CompetitionTable'
import { Link } from 'react-router-dom'
import { CREATE, COMPETITIONS, VIRTUAL_COMPETITIONS } from '../../Routes'
import 'bootstrap-icons/font/bootstrap-icons.css'
import CompetitionCalender from './CompetitionCalender'
import { UserContext } from './../../common/UserContext';
import { LEADER_RANK, ADMIN_RANK } from '../../Constants';
import VirtualCompetitionTable from './virtual/VirtualCompetitionTable'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal)

const COMPETITION_TABLE_HEADERS = [
  '',
  'Competition name',
  'Start',
  'Finish',
  'Class'
]

const VIRTUAL_COMPETITION_TABLE_HEADERS = [
  'Competition name',
  'Tasks'
]

function Competitions(props) {
  const userContext = useContext(UserContext)

  const [list, setList] = useState([])
  const [competitionsLoading, setCompetitionsLoading] = useState(true)
  const [practicesLoading, setPracticesLoading] = useState(true) // Virtual competitions
  const [virtualCompetitions, setVirtualCompetitions] = useState()
  const [showCreateCompetitionButton, setShowCreateCompetitionButton] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.user.rank === LEADER_RANK || userContext.user.rank === ADMIN_RANK) {
      setShowCreateCompetitionButton(true)
    }

    (async () => {
      try {
        const res = await getCompetitions()

        setCompetitionsLoading(false);

        if (res.success) {
          setList(res.data.competitions)
        }
      } catch (err) {
        console.log(err)
      }
    })();


    (async () => {
      try {
        const res = await getVirtualCompetitions(userContext.user.session)

        setPracticesLoading(false)

        if (res.success) {
          setVirtualCompetitions(res.data.virtual_competitions)
        }
      } catch (err) {
        console.log(err)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runVirtRandomCompetition() {
    (async () => {
      const { value: numOfTasks } = await Swal.fire({
        title: 'Number of tasks you would like to solve',
        input: 'text',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!'
          } else if (isNaN(value)) {
            return 'Enter a number.'
          }
        }
      })

      if (numOfTasks === undefined) {
        return
      }

      if (numOfTasks < 0 || numOfTasks > 10) {
        MySwal.fire({
          title: <p>Could not start practice competition!</p>,
          html: <p>You can only practice with a maximum of 10 tasks</p>,
          icon: 'warning'
        })
        return
      }

      try {
        const res = await startVirtualRandomCompetition(Number(numOfTasks), userContext.user.session)

        if (res.success) {
          navigate(VIRTUAL_COMPETITIONS + "/" + res.data.virt_comp_id)
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

  return (
    <React.Fragment>
      <div className="bg-dark">
        <div className="container py-4">
          <div className="row">
            <div className="col-12 d-flex align-items-center">
              <h3 className='text-white me-auto'>Check out ongoing competitions:</h3>
              {
                showCreateCompetitionButton && (
                  <Link to={COMPETITIONS + "/" + CREATE} className="btn btn-success"><i className="bi bi-file-earmark-plus"></i> Create new competition</Link>
                )
              }
              <button onClick={(e) => runVirtRandomCompetition()} className="btn btn-success ms-2"><i className="bi bi-cloud-plus"></i> Start virtual competition</button>
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
            <CompetitionTable data={list} columns={COMPETITION_TABLE_HEADERS} loading={competitionsLoading} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h3>Virtual competitions</h3>
            <p className="text-muted">Want to practice off of existing competitions? Want to get a random set of problems and challenge your coding skills? This is where virtual competitions come in.<br /> Pick up right where you left of by selecting a virtual competition right from this list.</p>
            <VirtualCompetitionTable data={virtualCompetitions} columns={VIRTUAL_COMPETITION_TABLE_HEADERS} loading={practicesLoading} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Competitions;