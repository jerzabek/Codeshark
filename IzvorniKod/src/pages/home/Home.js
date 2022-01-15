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

      <div className="container">
        <div className="container" style={{ marginTop: "1rem" }}>

          <h2>Recent Competitions</h2>
          <div className="row justify-content-center align-items-strech">
            {comps.map((comp) => {

              var start = new Date(comp.start_time);
              start = start.toLocaleDateString("hr", {day: '2-digit', month: '2-digit'}) + " - " + start.toLocaleTimeString("hr", { hour: '2-digit', minute: '2-digit' });

              var end = new Date(comp.end_time);
              end = end.toLocaleDateString("hr", {day: '2-digit', month: '2-digit'}) + " - " + end.toLocaleTimeString("hr", { hour: '2-digit', minute: '2-digit' });

              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-2" key={comp.comp_slug}>
                  <div className="card h-100 hover-pointer" onClick={(e) => linkToComp(comp.comp_slug)}>
                    <img src={'https://cdn.domefan.club/trophy/' + comp.trophy_img} className="card-img-top align-self-center"
                      style={{ width: "auto", height: "5rem", margin: "1rem" }} onError={(e) => {
                        if (!e.target.src.includes(defaultAvatar)) {

                          e.target.onerror = null; e.target.src = defaultAvatar
                        }
                      }} alt={defaultAvatar} />
                    <div className="card-body">

                      <h5 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} className="card-title">{comp.comp_name}</h5>

                      <h6 className="card-subtitle mb-2 text-muted">{start}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">{end}</h6>
                      <p className="card-text">Tasks : {comp.task_count}</p>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>

        <div className="container" style={{ marginTop: "1rem" }}>

          <h2>Recent Tasks</h2>
          <div className="row justify-content-center align-items-strech">
            {tasks.map((task) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-2 mb-2" key={task.slug}>
                <div className="card h-100 hover-pointer" onClick={(e) => linkToTask(task.slug)} >
                  <div className="card-body">
                    <h5 className="card-title">{task.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Difficulty : {task.difficulty}</h6>
                    {/*<p className="card-text">{task.slug}</p>*/}

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <div className="container py-5 text-center">
        <h1>Welcome to CodeShark</h1>
        <p className='mb-1'>Brought to you with <i className="bi bi-suit-heart-fill text-danger"></i> by <span className="fw-bold">DomeFanClub</span></p>
        <p className="text-muted">FER Programsko inženjerstvo 2021./2022.</p>
      </div>
    </div >
  );

}

export default Home;