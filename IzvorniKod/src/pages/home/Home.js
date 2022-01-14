import React, { useContext, useEffect, useState } from 'react';
import bannerImage from '../../assets/images/header/header-home.jpg';
import '../../assets/style/common/banner.css';
import { Link } from 'react-router-dom';
import { COMPETITIONS, REGISTER, TASK, PROBLEMS } from '../../Routes';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getHomeContests } from '../../API';
import { useNavigate } from 'react-router';
import { UserContext } from './../../common/UserContext';

function Home(props) {

  const userContext = useContext(UserContext);

  const [tasks, setTasks] = useState([]);
  const tasksArr = [];

  const [comps, setComps] = useState([]);
  const compsArr = [];

  const defaultAvatar = process.env.REACT_APP_IMAGE_PREFIX + process.env.REACT_APP_DEFAULT_AVATAR;

  const navigate = useNavigate()
  function linkToComp(slug) {
    navigate(COMPETITIONS + "/" + slug);
  }
  function linkToTask(slug) {
    navigate(TASK + "/" + slug);
  }

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
          tasksArr.push('Error');
          compsArr.push('Error');
        }
      } catch (err) {
        console.log(err)
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="banner-container">
        <img className="banner-background" src={bannerImage} alt="Banner" />
        <div className="container banner-content text-white">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-9 text-center text-md-start">
              <h1 className="banner-title fw-700">Welcome to<br /><span className="fw-800">CodeShark</span></h1>
              <p className="banner-description">Wish to participate in coding contests or create one yourself? Join CodeShark today!</p>
              <p className="banner-description">When it comes to competition, CodeShark has none - besides the ones it hosts.</p>
              {(userContext.user === undefined) ?
                <Link to={REGISTER} className='btn btn-info btn-lg btn-outline-light rounded-0 btn-cta px-5'>Sign up now!</Link>
                :
                <Link to={PROBLEMS} className='btn btn-info btn-lg btn-outline-light rounded-0 btn-cta px-5'>Get Started</Link>
              }
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="container" style={{ marginTop: "1rem" }}>

          <h2>Recent Competitions</h2>
          <div class="d-flex flex-row justify-content-center">
            {comps.map((comp) => (
              <div class="card" onClick={(e) => linkToComp(comp.comp_slug)} style={{ width: "15rem", height: "15rem", margin: "0.25rem" }}>
                <img src={'https://cdn.domefan.club/trophy/' + comp.trophy_img} class="card-img-top align-self-center"
                  style={{ width: "auto", height: "5rem", margin: "1rem" }} onError={(e) => {
                    if (!e.target.src.includes(defaultAvatar)) {

                      e.target.onerror = null; e.target.src = defaultAvatar
                    }
                  }} alt={defaultAvatar} />
                <div class="card-body">

                  <h5 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} class="card-title">{comp.comp_name}</h5>

                  <h6 class="card-subtitle mb-2 text-muted">{comp.start_time}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">{comp.end_time}</h6>
                  <p class="card-text">Tasks : {comp.task_count}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div class="container" style={{ marginTop: "1rem" }}>

          <h2>Recent Tasks</h2>
          <div class="d-flex flex-row justify-content-center">
            {tasks.map((task) => (
              <div class="card" onClick={(e) => linkToTask(task.slug)} style={{ width: "20rem", height: "5rem", margin: "0.25rem" }}>
                <div class="card-body">
                  <h5 class="card-title">{task.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Difficulty : {task.difficulty}</h6>
                  {/*<p class="card-text">{task.slug}</p>*/}

                </div>
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
    </div >
  );

}

export default Home;