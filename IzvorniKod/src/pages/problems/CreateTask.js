import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'
import { UserContext } from './../../common/UserContext';
import { useNavigate } from 'react-router'
import { Navigate } from 'react-router-dom'
import { HOME, PROBLEMS, TASK } from '../../Routes'
import { createTask } from '../../API'
import { ADMIN_RANK, LEADER_RANK } from '../../Constants'

const MySwal = withReactContent(Swal.mixin({
  customClass: {
    denyButton: 'btn btn-success me-4',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true
}))

function CreateTask(props) {
  const userContext = useContext(UserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState(1)
  const [maxExeTime, setMaxExeTime] = useState(1.0)
  const [privateTask, setPrivateTask] = useState(true)
  const navigate = useNavigate()

  const [inputList, setInputList] = useState([{ input: "", output: "" }]);

  if (!(userContext.user.rank === LEADER_RANK || userContext.user.rank === ADMIN_RANK)) {
    return <Navigate to={HOME} />;
  }

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { input: "", output: "" }]);
  };


  function linkToTask(slug) {
    navigate(TASK + "/" + slug)
  }

  function formSubmit(e) {
    console.log(e);
    e.preventDefault();

    (async () => {
      try {
        let data = {
          "task_name": name,
          "difficulty": difficulty,
          "max_exe_time": Number(maxExeTime),
          "task_text": description,
          "private": privateTask,
          "test_cases": inputList
        }
        const res = await createTask(data, userContext.user.session)

        if (res.success) {
          MySwal.fire({
            title: <p>Successfully created task!</p>,
            html: <p>Congratulations! Your task had been created.</p>,
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Go to task`,
          }).then((result) => {
            if (result.isDenied) {
              linkToTask(res.data.slug)
            }
          })
        } else {
          MySwal.fire({
            title: <p>An error occurred :(</p>,
            html: <p>{res.error}</p>
          })
        }
      } catch (err) {
        console.log(err)
      }
    })();
  }
  const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },

  ]

  return (
    <div className='container py-4'>
      <div className="d-flex flex-row justify-content-between">
        <h3>Create new Task!</h3>
        <Link className="btn btn-light" to={PROBLEMS}>Cancel</Link>
      </div>

      <form id="create-task-form" onSubmit={formSubmit}>
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
          <div className='mb-3 col-12 col-md-3 col-lg-2'>
            <p className="mb-2">Difficulty</p>
            <Select options={options}
              className="basic-single"
              defaultValue={options[0]}
              onChange={(evn) => setDifficulty(evn.value)}
            />
          </div>
          <div className="col-9 col-md-3 col-lg-2">
            <label htmlFor="max_exe_time" className="form-label">Max execution time</label>
            <input type="number" step="0.1" className="form-control" name="max_exe_time" id="max_exe_time"
              value={maxExeTime}
              onChange={(e) => setMaxExeTime(e.target.value)}
              required />
          </div>
          <div className="col-3 col-sm-2 align-self-center">
            <div className="form-check">
              <label htmlFor="privateTask" className="form-check-label">Is task private?</label>
              <input type="checkbox" className="form-check-input" name="privateTask" id="privateTask"
                value={privateTask}
                onChange={(e) => setPrivateTask(e.target.value)} />
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
        </div>
        <div className="row">
          <div className="row">
            <div className="col-12">
              <h4>Task inputs and outputs.</h4>
              <p className="text-muted">Please enter the test cases used to validate the solutions of competitors.</p>
            </div>
            <div className="col-12">
              <button type="button" className="btn mb-2 btn-success" onClick={handleAddClick}>Add new testcase</button>
            </div>
          </div>
          <div className="col-12 col-md-4">
            {inputList.map((x, i) => {
              return (
                <div className="box mb-2" key={i}>
                  <input
                    className="form-control mb-2"
                    name="input"
                    placeholder="input"
                    value={x.firstName}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <input
                    className="form-control mb-2"
                    name="output"
                    placeholder="output"
                    value={x.lastName}
                    onChange={e => handleInputChange(e, i)}
                  />
                  <div className="btn-box">
                    {
                      inputList.length !== 1 && <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveClick(i)}>Remove</button>
                    }
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12">
            <button type="submit" className="btn btn-success">Create task</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;