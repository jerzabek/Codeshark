import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { COMPETITIONS } from '../../Routes';
import './competition-table.css'
import { useNavigate } from "react-router-dom";

function CompetitionTable({ data, columns, loading }) {
  const [displayData, setDisplayData] = useState(data)

  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    setDisplayData(
      data.filter((row) => row.ime_natjecanja.toLowerCase().includes(filterName.toLowerCase()))
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
      <p>No competitions available :(</p>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  function linkToCompetition(competition_id) {
    navigate(COMPETITIONS + "/" + competition_id);
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
            displayData.map((row, rowIndex) => {
              var start = new Date(row.vrijeme_pocetak)
              start = start.toLocaleDateString("hr") + " - " + start.toLocaleTimeString("hr")

              var end = new Date(row.vrijeme_kraj)
              end = end.toLocaleDateString("hr") + " - " + end.toLocaleTimeString("hr")

              return (
                <tr key={"competitor-row-" + rowIndex} onClick={(e) => linkToCompetition(row.natjecanje_id)} className="hover-pointer align-middle">
                  <td><img className="rounded-circle" style={{ width: "3em" }} src={process.env.REACT_APP_TROPHY_PREFIX + row.slika_trofeja} alt="Trophy" /></td>
                  <td>{row.ime_natjecanja}</td>
                  <td>{start}</td>
                  <td>{end}</td>
                  <td>{row.ime_klase_natjecanja}</td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default CompetitionTable;