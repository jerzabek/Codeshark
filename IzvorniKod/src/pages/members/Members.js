import React, { useEffect, useState } from 'react';
import '../../assets/style/common/banner.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { loadUsers } from '../../API';

function Members(props) {

  const [users, setUsers] = useState([]);

  const items = [];

  const defaultAvatar = process.env.REACT_APP_IMAGE_PREFIX + process.env.REACT_APP_DEFAULT_AVATAR

  useEffect(() => {

    (async () => {
      try {
        const res = await loadUsers()

        console.log(res)

        if (res.success) {

          for (const user of res.data.users) {
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
  }, []);

  return (
    <div>

      <div class="container">

        <table class="table table-striped table-hover table-sm" >
          <thead class="table-dark">
            <tr style={{ textAlign: "center" }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
                <th scope="row">
                  <img src={process.env.REACT_APP_IMAGE_PREFIX + user.slikaprofila} style={{ width: "2.5rem", height: "2.5rem" }}
                    onError={(e) => {
                      if (!e.target.src.includes(defaultAvatar)) {
                        // So that it doesnt keep spamming if the default avatar is not available
                        e.target.onerror = null; e.target.src = defaultAvatar
                      }
                    }} alt="Fallback Juan didn't load" />
                </th>
                <td>{user.ime_prezime}</td>
                <td>{user.korisnickoime}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Members;
