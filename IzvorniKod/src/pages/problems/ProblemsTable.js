import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './problems-table.css'
import { TASK } from '../../Routes'
import { Link } from 'react-router-dom'

function ProblemsTable({ data, columns, loading }) {
  const [displayData, setDisplayData] = useState(data)
  
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    setDisplayData(
      data.filter((row) => row.name.includes(filterName))
    )
  }, [filterName, data])

  if (loading === true) {
    return (
      <p>Loading...</p>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p>No Problems available :(</p>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="row align-items-end my-3 mb-2">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Problem name:</label>
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
                <th scope="col" key={index}>{name}</th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {displayData && displayData.map(task =>
            <tr  key={task.task_id}> 
              <td></td>
              <td>{task.name}</td>
              <td>{task.tezina} / 5 </td>
              <td><Link to={TASK} className='btn btn-info btn-outline-light rounded-50 btn-cta p-1'>Solve!</Link></td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default ProblemsTable;