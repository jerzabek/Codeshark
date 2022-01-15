import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getVirtualCompetitionLeaderboards } from '../../../API';
import { UserContext } from '../../../common/UserContext';
import { MEMBERS, VIRTUAL_COMPETITIONS } from '../../../Routes';

function VirtualCompetitionLeaderboards(props) {
  const userContext = useContext(UserContext)

  const [leaderboards, setLeaderboards] = useState([])

  const { competition_id } = useParams()

  useEffect(() => {
    (async () => {
      try {
        const res = await getVirtualCompetitionLeaderboards(competition_id, userContext.user.session)

        if (res.success) {
          setLeaderboards(res.data)
        }
      } catch (err) {
        console.log(err)
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-10">
          <h4>Leaderboards for the virtual competition.</h4>
          <p className="text-muted">Here you can compare your own results against those of the results of the real competitors.</p>
        </div>
        <div className="col-12 col-md-2">
          <Link to={VIRTUAL_COMPETITIONS + "/" + competition_id} className="btn btn-primary">Back to competition</Link>
        </div>
      </div>
      {
        leaderboards.length > 0 ? (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <td>Username</td>
                <td>Score</td>
              </tr>
            </thead>
            <tbody>
              {leaderboards.map(row =>
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
  );
}

export default VirtualCompetitionLeaderboards;