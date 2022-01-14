import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'
import { UserContext } from './../../common/UserContext';
import { useNavigate } from 'react-router'
import { PROBLEMS } from '../../Routes'

const MySwal = withReactContent(Swal.mixin({
  customClass: {
    denyButton: 'btn btn-success me-4',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
}))

function CreateTask(props) {
  const userContext = useContext(UserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState([])
  

  function linkToTask() {
    //TODO link to task/slug
  }

  function handleSubmit(e) {
    //e.preventDefault()

    (async () => {
      try {
        const res = true // await createTask()   TODO

        if (res) {
          MySwal.fire({
            title: <p>Successfully created task!</p>,
            html: <p>Congratulations! Your task had been created.</p>,
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: `Go to task`,
          }).then((result) => {
            if (result.isDenied) {
              linkToTask()
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
  const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    
]

const [state, setState] = React.useState(
    1

);
  return (
    <div className='container py-4'>
      <div className="d-flex flex-row justify-content-between">
        <h3>Create new Task!</h3>
        <Link className="btn btn-light" to={PROBLEMS}>Cancel</Link>
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
            <div className='mb-3 col-3'>
                <p>Difficulty</p>
             <Select options={options}
                        className="basic-single"
                        defaultValue={options[0]}
                        onChange={(evn) => setState(evn.value)}
            />
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
          <div className="col-12">
            <button type="submit" className="btn btn-success">Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;