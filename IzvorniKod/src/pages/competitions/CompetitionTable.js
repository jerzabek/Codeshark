import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './competition-table.css'

function CompetitionTable({ data, columns, loading }) {
  const [displayData, setDisplayData] = useState(data)

  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    setDisplayData(
      data.filter((row) => row.naziv.includes(filterName))
    )
  }, [filterName, data])

  if (loading === true) {
    return (
      <p>Loading...</p>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p>No competitions available :(</p>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  // TODO: Sorting

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
            displayData.map((row, rowIndex) =>
              <tr key={"competitor-row-" + rowIndex}>
                {
                  Object.values(row).map((column, colIndex) =>
                    <td key={"competitor-col-" + rowIndex + colIndex}>{column}</td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default CompetitionTable;