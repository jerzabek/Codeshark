import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { getTasks } from '../../API'
import ProblemsTable from './ProblemsTable'
import { Link } from 'react-router-dom'
import { CREATE, PROBLEMS } from '../../Routes'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { UserContext } from '../../common/UserContext';
import { ADMIN_RANK, LEADER_RANK } from '../../Constants'

const PROBLEMS_TABLE_HEADERS = [
  '#',
  'Name',
  'Difficulty',
]

function Problems(props) {
  const userContext = useContext(UserContext)

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canCreateNewProblems, setCanCreateNewProblems] = useState(false);

  useEffect(() => {
    if (userContext.user.rank === LEADER_RANK || userContext.user.rank === ADMIN_RANK) {
      setCanCreateNewProblems(true)
    }

    (async () => {
      try {
        const res = await getTasks()

        setLoading(false);

        if (res.success) {
          setList(res.data.tasks)
        } else {
          let mock = []

          for (var i = 0; i < 20; i++) {
            mock.push({ task_id: 'abcdef'.charAt(Math.floor(Math.random() * 6)), name: 'aa', tezina: '2' })
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
          <h3>Sharpen your skills!</h3>
          {
            canCreateNewProblems && (
              <Link to={PROBLEMS + "/" + CREATE} className="btn btn-success"><i className="bi bi-file-earmark-plus"></i> Create new problem</Link>
            )
          }
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <ProblemsTable data={list} columns={PROBLEMS_TABLE_HEADERS} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Problems;