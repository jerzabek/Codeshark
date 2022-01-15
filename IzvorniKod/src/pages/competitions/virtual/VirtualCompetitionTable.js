import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { TASK, VIRTUAL_COMPETITIONS } from '../../../Routes';
import '../competition-table.css'
import { Link, useNavigate } from "react-router-dom";
import { deleteVirtualCompetition } from '../../../API';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { UserContext } from '../../../common/UserContext';

const MySwal = withReactContent(Swal)

function VirtualCompetitionTable({ data, columns, loading }) {
  const [displayData, setDisplayData] = useState(data)
  const userContext = useContext(UserContext)

  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    if (data === undefined) return

    setDisplayData(
      data.filter((row) =>
        row.name.toLowerCase().includes(filterName.toLowerCase()) ||
        row.tasks.some(({ name }) => name.toLowerCase().includes(filterName.toLowerCase()))
      )
    )
  }, [filterName, data])

  const navigate = useNavigate();

  if (loading === true) {
    return (
      <p>Loading...</p>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-muted">No virtual competitions started!</p>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  function linkToCompetition(competition_id) {
    navigate(VIRTUAL_COMPETITIONS + "/" + competition_id);
  }


  function deleteCompetition(id) {
    MySwal.fire({
      title: 'Do you really want to delete this competition?',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        (async () => {
          try {
            const res = await deleteVirtualCompetition(id, userContext.user.session)

            if (res.success) {
              MySwal.fire({
                title: <p>Successfully deleted competition!</p>,
                icon: 'success'
              }).then(() => window.location.reload())
            } else {
              MySwal.fire({
                title: <p>Could not delete competition.</p>,
                html: <p>{res.error}</p>,
                icon: 'error'
              })
            }
          } catch (err) {
            console.log(err)
          }
        })();
      }
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="row align-items-end my-3 mb-2">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Competition name:</label>
              <input type="name"
                className="form-control"
                id="name"
                autoComplete='off'
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)} />
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <button type="submit" className="btn btn-primary">filter</button>
          </div>
        </div>
      </form>
      <table className="table table-striped table-hover competition-table">
        <thead>
          <tr>
            {
              columns.map((name, index) =>
                <th scope="col" key={"competitor-row-header-" + index}>{name}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            displayData && displayData.map((row, rowIndex) =>
              <tr key={"competitor-row-" + rowIndex} className="hover-pointer align-middle">
                <td onClick={(e) => linkToCompetition(row.virt_id)}>{row.name}</td>
                <td>{row.tasks.map(({ name, slug }) =>
                  <Link className="me-2 badge bg-success" to={TASK + "/" + slug} key={slug}>{name}</Link>
                )}</td>
                <td><button className="btn btn-sm btn-danger" onClick={(e) => deleteCompetition(row.virt_id)}><i class="bi bi-x-circle"></i></button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default VirtualCompetitionTable;