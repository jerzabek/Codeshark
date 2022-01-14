import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompetition, getTask } from '../../../API';
import { HOME } from '../../../Routes';
import Task from '../../problems/Task';
import './competition.css'

function Competition({ isVirtual }) {
  const [tasks, setTasks] = useState()
  const [taskComponents, setTaskComponents] = useState([])
  const [competition, setCompetition] = useState()
  const [timerInterval, setTimerInterval] = useState()
  const [timeLeft, setTimeLeft] = useState()
  const [selectedTask, setSelectedTask] = useState(0)

  const { competition_slug } = useParams()

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompetition(competition_slug)

        if (res.success) {
          let end_time = new Date(res.data.end_time)
          let start_time = new Date(res.data.start_time)

          let rightNow = new Date()

          if (rightNow < start_time || end_time < rightNow) {
            // User tried launching competition that is not in progress - we do not allow it
            // window.location.href = HOME
            // return;
          }

          setCompetition(res.data)

          await Promise.all(res.data.tasks.map(async (taskSlug) => {
            const res = await getTask(taskSlug)

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

    var countDownDate = new Date(competition.start_time).getTime();

    let setTimer = function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

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
          <div className="container-fluid">

          </div>
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
        <div className="col-12 col-md-9 text-center text-muted">
          {
            timeLeft ? (
              <p>Time left: {timeLeft}</p>
            ) : (<React.Fragment />)
          }
        </div>
      </div>
      {taskComponents.map((task, index) =>
        <div className={index === selectedTask ? "" : "d-none"}>
          {task}
        </div>
      )}
    </div>
  );
}

export default Competition; 