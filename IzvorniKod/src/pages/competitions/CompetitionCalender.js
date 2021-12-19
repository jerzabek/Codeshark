import React from 'react'
import Kalend, { CalendarView } from 'kalend'
import 'kalend/dist/styles/index.css'
import './competition-calender.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function CompetitionCalender(props) {
  // Mock data
  const events = {
    '18-12-2021': [
      {
        id: 1,
        startAt: '2021-12-18T18:00:00.000Z',
        endAt: '2021-12-18T19:00:00.000Z',
        summary: 'Infokup',
        color: 'blue',
        description: "Lorem ipsum dolor sir amet."
      }
    ],
    '19-12-2021': [
      {
        id: 2,
        startAt: '2021-12-19T18:00:00.000Z',
        endAt: '2021-12-19T19:00:00.000Z',
        summary: 'Državno',
        color: 'orange',
        description: "Ovo je opis državnog natjecanja iz uh the uhh umm"
      }
    ]
  }

  function clickOnEvent(e) {
    // TODO: Ubaciti link na stranicu natjecanja
    MySwal.fire({
      title: <p>{e?.summary || 'Competition name unavailable'}</p>,
      html: <p>{e?.description || 'Description unavailable'}</p>,
      confirmButtonText: "Close"
    })
  }

  return (
    <div className='competition-calender-container border my-2 rounded-top'>
      <Kalend
        events={events}
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