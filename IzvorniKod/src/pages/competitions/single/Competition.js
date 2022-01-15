import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getCompetition, getTask, getVirtualCompetition } from '../../../API';
import { UserContext } from '../../../common/UserContext';
import { COMPETITIONS_LEADERBOARDS, HOME, VIRTUAL_COMPETITIONS } from '../../../Routes';
import Task from '../../problems/Task';
import './competition.css'

function Competition({ isVirtual }) {
  const userContext = useContext(UserContext)
  const [tasks, setTasks] = useState()
  const [taskComponents, setTaskComponents] = useState([])
  const [competition, setCompetition] = useState()
  const [timerInterval, setTimerInterval] = useState()
  const [timeLeft, setTimeLeft] = useState()
  const [selectedTask, setSelectedTask] = useState(0)

  const { competition_slug } = useParams()
  const { competition_id } = useParams()

  useEffect(() => {
    (async () => {
      try {
        // We get the virtual competitions on a different endpoint than regular competitions
        const res = isVirtual ?
          await getVirtualCompetition(competition_id, userContext.user.session)
          :
          await getCompetition(competition_slug, userContext.user.session);

        if (res.success) {
          if (!isVirtual) {
            // Virtual competitions do not have a set time frame
            let end_time = new Date(res.data.end_time)
            let start_time = new Date(res.data.start_time)

            let rightNow = new Date()

            if (rightNow < start_time || end_time < rightNow) {
              // User tried launching competition that is not in progress - we do not allow it
              window.location.href = HOME
              return;
            }
          }

          setCompetition(res.data)

          await Promise.all(res.data.tasks.map(async (taskSlug) => {
            const res = await getTask(isVirtual ? taskSlug.slug : taskSlug, userContext.user.session)

            if (res.success) {
              return res.data
            }
            // TODO: Handle when tasks can not be loaded - invalid competition
          })).then((tasks) => {
            if (tasks[0] === undefined) {
              return;
            }

            setTasks(tasks)
            setTaskComponents(tasks.map((taskSlug, index) =>
              <Task key={index} preloadedTask={taskSlug} />
            ))
          })

        }
      } catch (err) {
        console.log(err)
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (competition === undefined) return;
    if (isVirtual) return

    var countDownDate = new Date(competition.end_time);
    console.log(competition.end_time)

    let setTimer = function () {

      // Get today's date and time
      var now = new Date();

      // Find the distance between now and the count down date
      var distance = countDownDate.getTime() - now.getTime();

      // Time calculations for days, hours, minutes and seconds
      // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if(countDownDate.getDate() !== now.getDate()) {
        hours += 24 * (new Date(distance).getUTCDate() - 1);
      }
      // Display the result in the element with id="demo"
      setTimeLeft(hours + "h " + minutes + "m " + seconds + "s")

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timerInterval);
      }
    }

    // Update the count down every 1 second
    setTimerInterval(setInterval(setTimer, 1000))
    setTimer() // We call the function immediatelly, since setInterval starts with a delay

    return () => clearInterval(timerInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competition])

  function switchTask(newIndex) {
    setSelectedTask(newIndex)
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-3">
          <div className="card">
            <div className="card-header">
              Tasks:
            </div>
            <ul className="list-group list-group-flush">
              {tasks && tasks.map(({ task_name, task_slug }, index) =>
                <li onClick={(e) => switchTask(index)} className={"list-group-item task-item hover-pointer" + (index === selectedTask ? " bg-info bg-opacity-25 fw-bold" : "")} key={index + "-" + task_slug}>{task_name}</li>
              )}
            </ul>
          </div>
        </div>
        {
          competition && (
            !isVirtual ? (
              <div className="col-12 col-md-9 py-2">
                <div className="row">
                  <div className="col-12 col-sm-9 text-center text-sm-end">
                    <h4>{competition.comp_name}</h4>

                    {
                      timeLeft ? (
                        <p className="text-muted">Time left: {timeLeft}</p>
                      ) : (<React.Fragment />)
                    }
                  </div>
                  <div className="col-12 col-sm-3">
                    <img src={process.env.REACT_APP_TROPHY_PREFIX + competition.trophy_img} alt="Trophy for competition" className="img-thumbnail" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-12 col-md-9 py-2">
                <h4>{competition.name}</h4>
                <p className="text-muted">This is a virtual competition. There is no time limit. Good luck!</p>

                <Link to={VIRTUAL_COMPETITIONS + "/" + competition_id + "/" + COMPETITIONS_LEADERBOARDS} className="btn btn-success">Competition leaderboards</Link>
              </div>
            )
          )
        }
      </div>
      {taskComponents.map((task, index) =>
        <div key={index} className={index === selectedTask ? "" : "d-none"}>
          {task}
        </div>
      )}
      <div style={{ height: '200px' }}></div>
    </div>
  );
}

export default Competition; 
