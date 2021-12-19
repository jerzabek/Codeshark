import React, { useEffect, useState } from 'react';
import '../../assets/style/common/banner.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { loadUsers, getAvatar } from '../../API';

function Members(props) {

  const [users, setUsers] = useState([]);

  const items = [];

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

  }, []);

  return (
    <div>
      {users.map((user) => (
        <div>
          <span>
            <img src={process.env.REACT_APP_IMAGE_PREFIX + user.slikaprofila}/>
            {user.korisnickoime} {user.ime_prezime}
            
            </span>

        </div>
      ))}
    </div>
  );
}

export default Members;
