import React, { useEffect, useState } from 'react';
import bannerImage from '../../assets/images/header/header-home.jpg';
import '../../assets/style/common/banner.css';
import { Link } from 'react-router-dom';
import { REGISTER } from '../../Routes';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getHomeContests } from '../../API';

function Home(props) {

  const [tasks, setTasks] = useState([]);
  const tasksArr = [];

  const [comps, setComps] = useState([]);
  const compsArr = [];

  useEffect(() => {

    (async () => {
      try {
        const res = await getHomeContests()

        console.log(res)

        if (res.success) {

          for (const task of res.data.tasks) {
            tasksArr.push(task);
          }

          setTasks(tasksArr);

          for (const comp of res.data.competitions) {
            compsArr.push(comp);
          }

          setComps(compsArr);

        } else {
          tasksArr.push('Yikes');
          compsArr.push('Yikes');
        }
      } catch (err) {
        console.log(err)
      }
    })();

  }, []);

  return (
    <div>
      <div className="banner-container">
        <img className="banner-background" src={bannerImage} alt="Banner" />
        <div className="container banner-content text-white">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-9 text-center text-md-start">
              <h1 className="banner-title fw-700">Welcome to<br /><span className="fw-800">CodeShark</span></h1>
              <p className="banner-description">Wish to participate in coding contests or create one yourself? Join CodeShark today! When it comes to competition, CodeShark has none - besides the ones it hosts.</p>
              <Link to={REGISTER} className='btn btn-info btn-lg btn-outline-light rounded-0 btn-cta px-5'>Sign up now!</Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h2>Recent Competitions</h2>
          <div>
            {comps.map((comp) => (
              <div>
                {comp}

              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Recent Tasks</h2>
          <div>
            {tasks.map((task) => (
              <div>
                <h4>{task.name}</h4>
                <h6>Difficulty : {task.tezina}</h6>
                <p>{task.slug}</p>

              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5 text-center">
        <h1>Welcome to CodeShark</h1>
        <p className='mb-1'>Brought to you with <i className="bi bi-suit-heart-fill text-danger"></i> by <span className="fw-bold">DomeFanClub</span></p>
        <p className="text-muted">Work in progress #proginz 2021./2022.</p>
      </div>
    </div>
  );
}

export default Home;