import React, { useEffect, useState } from 'react';
import '../../assets/style/common/banner.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MEMBERS } from '../../Routes';
import { loadUsers } from '../../API';
import { useNavigate } from 'react-router';

function Members() {
  const [filterName, setFilterName] = useState('')
  const [users, setUsers] = useState([])

  const navigate = useNavigate()
  function linkToMember(username) {
    navigate(MEMBERS + "/" + username);
  }
  const items = [];

  const defaultAvatar = process.env.REACT_APP_IMAGE_PREFIX + process.env.REACT_APP_DEFAULT_AVATAR

  useEffect(() => {

    (async () => {
      try {
        const res = await loadUsers()

        if (res.success) {

          for (const user of res.data.users.filter((user) => user.username.toLowerCase().includes(filterName.toLowerCase()))) {

            items.push(user);
          }

          setUsers(items);

        } else {
          items.push('Unable to load members');
        }
      } catch (err) {
        console.log(err)
      }


    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);

  return (
    <div>

      <div className="container">

          <div className="row align-items-end my-3 mb-2">
            <div className="col-12 col-md-4 col-lg-3">
              <div className="form-group">
                <input type="name"
                  placeholder="Search by username..."
                  className="form-control"
                  id="name"
                  autoComplete='off'
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)} />
              </div>
            </div>
          </div>

        <table className="table table-striped table-hover table-sm" >
          <thead className="table-dark">
            <tr style={{ textAlign: "center" }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr onClick={(e) => linkToMember(user.username)} style={{ textAlign: "center", verticalAlign: "middle" }}>
                <th scope="row">
                  <img src={process.env.REACT_APP_IMAGE_PREFIX + user.pfp_url} style={{ width: "2.5rem", height: "2.5rem" }}
                    onError={(e) => {
                      if (!e.target.src.includes(defaultAvatar)) {
                        // So that it doesnt keep spamming if the default avatar is not available
                        e.target.onerror = null; e.target.src = defaultAvatar
                      }
                    }} alt="Fallback Juan didn't load" />
                </th>
                <td>{user.name_last_name}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Members;
