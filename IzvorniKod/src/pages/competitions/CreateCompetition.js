import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createCompetition, setupCreateCompetition } from '../../API'
import { COMPETITIONS } from '../../Routes'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'
import { UserContext } from './../../common/UserContext';
import { useNavigate } from 'react-router'

const MySwal = withReactContent(Swal.mixin({
  customClass: {
    denyButton: 'btn btn-success me-4',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
}))

function CreateCompetition(props) {
  const userContext = useContext(UserContext)

  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endTime, setEndTime] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [numOfTasks, setNumOfTasks] = useState(4)
  const [trophy, setTrophy] = useState()

  const [taskList, setTaskList] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const res = await setupCreateCompetition(userContext.user.username)

        if (res.success) {
          setTaskList(res.data.tasks.map((task) => {
            return {
              label: task.name,
              value: task.slug
            }
          }))
        }
      } catch (err) {
        console.log(err)
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  function linkToCompetition(competition_id) {
    navigate(COMPETITIONS + "/" + competition_id);
  }

  function handleSubmit(e) {
    e.preventDefault()

    const createCompetitionData = new FormData();
    createCompetitionData.append("imenatjecanja", name);
    createCompetitionData.append("vrijemepoc", startDate + " " + startTime);
    createCompetitionData.append("vrijemekraj", endDate + " " + endTime);
    createCompetitionData.append("tekstnatjecanja", description);

    let tasks = selectedTasks.map(({ value }) => value)

    createCompetitionData.append("tasks", tasks);
    createCompetitionData.append("trofejid", 3);
    createCompetitionData.append("username", userContext.user.username);
    createCompetitionData.append("slikatrofeja", 'globe.png');

    (async () => {
      try {
        const res = await createCompetition(createCompetitionData)

        if (res.success) {
          MySwal.fire({
            title: <p>Successfully created the competition!</p>,
            html: <p>Congratulations! Your competition has been published, people can apply to participate.</p>,
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Go to competition`,
          }).then((result) => {
            if (result.isDenied) {
              linkToCompetition(res.data.natjecanje_id)
            }
          })
        } else {
          MySwal.fire({
            title: <p>An error occurred :(</p>,
            html: <p>Something went wrong, please try again later</p>
          })
        }
      } catch (err) {
        console.log(err)
      }
    })();
  }

  return (
    <div className='container py-4'>
      <div className="d-flex flex-row justify-content-between">
        <h3>Create new competition!</h3>
        <Link className="btn btn-light" to={COMPETITIONS}>Cancel</Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <label htmlFor="numOfTasks" className="form-label"># of problems</label>
            <input type="number" className="form-control" name="numOfTasks" id="numOfTasks"
              value={numOfTasks}
              onChange={(e) => setNumOfTasks(e.target.value)}
              required />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Trophy image</label>
              <input className="form-control" type="file" id="formFile"
                value={trophy}
                onChange={(e) => setTrophy(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea rows="10" className="form-control" name="description" id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required></textarea>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="row mb-3">
              <div className="col-6 col-lg-4">
                <label htmlFor="startDate" className="form-label">Start date</label>
                <br />
                <input type="date" className="form-control" name="startDate" id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required />
              </div>

              <div className="col-6 col-lg-4">
                <label htmlFor="startTime" className="form-label">Start time</label>
                <br />
                <input type="time" className="form-control" name="startTime" id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required />
              </div>
            </div>

            <div className="row">
              <div className="col-6 col-lg-4">
                <label htmlFor="endDate" className="form-label">Finish date</label>
                <br />
                <input type="date" className="form-control" name="endDate" id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required />
              </div>

              <div className="col-6 col-lg-4">
                <label htmlFor="endTime" className="form-label">Finish time</label>
                <br />
                <input type="time" className="form-control" name="endTime" id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-2">
            <p>Select the problems that will be a part of the competition:</p>

            <Select
              isMulti={true}
              options={taskList}
              value={selectedTasks}
              onChange={(e) => {
                if (e.length <= numOfTasks) {
                  setSelectedTasks(e)
                }
              }} />

            <p className="text-muted small">Only private problems will be listed here - because you can not create a competition that contains tasks people could've already solved.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-success">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCompetition;