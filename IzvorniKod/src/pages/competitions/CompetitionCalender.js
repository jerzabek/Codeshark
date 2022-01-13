import React, { useEffect, useState } from 'react'
import Kalend, { CalendarView } from 'kalend'
import 'kalend/dist/styles/index.css'
import './competition-calender.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { COMPETITIONS } from '../../Routes'
import { useNavigate } from 'react-router'

const MySwal = withReactContent(Swal.mixin({
  customClass: {
    denyButton: 'btn btn-success me-4',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
}))

function CompetitionCalender({ events }) {
  const [formattedEvents, setFormattedEvents] = useState(events)

  useEffect(() => {
    console.log(events)
    setFormattedEvents(
      events
        .map((event) => {
          const startAt = new Date(event.start_time);
          const finishAt = new Date(event.end_time);
          const date = startAt.getDate() + "-" + (startAt.getMonth() + 1) + "-" + startAt.getFullYear();

          return {
            id: event.comp_slug,
            startAt: startAt.toISOString(),
            endAt: finishAt.toISOString(),
            date,
            summary: event.comp_name,
            color: 'blue',
            trophy: event.trophy_img
          }
        }).reduce(function (reducer, currEvent) {
          const key = currEvent.date

          reducer[key] = reducer[key] || [];
          reducer[key].push(currEvent);
          return reducer;
        }, Object.create(null))
    )

    console.log('formattedEvents', formattedEvents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events])

  const navigate = useNavigate()

  function linkToCompetition(competition_id) {
    navigate(COMPETITIONS + "/" + competition_id);
  }


  function clickOnEvent(e) {
    // TODO: Ubaciti link na stranicu natjecanja
    MySwal.fire({
      title: <p>{e?.summary || 'Competition name unavailable'}</p>,
      imageUrl: process.env.REACT_APP_TROPHY_PREFIX + e.trophy,
      imageHeight: 128,
      imageAlt: 'Competition trophy',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Go to competition`,
    }).then((result) => {
      if (result.isDenied) {
        linkToCompetition(e.id)
      }
    })
  }

  return (
    <div className='competition-calender-container border my-2 rounded-3 bg-white'>
      <Kalend
        events={formattedEvents}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.MONTH}
        disabledViews={[CalendarView.DAY]}
        onEventClick={clickOnEvent}
        onEventDragFinish={() => { window.location.reload(); }}
      />
    </div>
  );
}

export default CompetitionCalender;