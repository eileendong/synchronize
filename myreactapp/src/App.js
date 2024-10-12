// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //           hello
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from 'react'
// import { formatDate } from '@fullcalendar/core'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import { INITIAL_EVENTS, createEventId } from './event-util'

// export default function DemoApp() {
//   const [weekendsVisible, setWeekendsVisible] = useState(true)
//   const [currentEvents, setCurrentEvents] = useState([])

//   function handleWeekendsToggle() {
//     setWeekendsVisible(!weekendsVisible)
//   }

//   function handleDateSelect(selectInfo) {
//     let title = prompt('Please enter a new title for your event')
//     let calendarApi = selectInfo.view.calendar

//     calendarApi.unselect() // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay
//       })
//     }
//   }

//   function handleEventClick(clickInfo) {
//     if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//       clickInfo.event.remove()
//     }
//   }

//   function handleEvents(events) {
//     setCurrentEvents(events)
//   }

//   return (
//     <div className='demo-app'>
//       <Sidebar
//         weekendsVisible={weekendsVisible}
//         handleWeekendsToggle={handleWeekendsToggle}
//         currentEvents={currentEvents}
//       />
//       <div className='demo-app-main'>
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay'
//           }}
//           initialView='dayGridMonth'
//           editable={true}
//           selectable={true}
//           selectMirror={true}
//           dayMaxEvents={true}
//           weekends={weekendsVisible}
//           initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//           select={handleDateSelect}
//           eventContent={renderEventContent} // custom render function
//           eventClick={handleEventClick}
//           eventsSet={handleEvents} // called after events are initialized/added/changed/removed
//           /* you can update a remote database when these fire:
//           eventAdd={function(){}}
//           eventChange={function(){}}
//           eventRemove={function(){}}
//           */
//         />
//       </div>
//     </div>
//   )
// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   )
// }

// function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
//   return (
//     <div className='demo-app-sidebar'>
//       <div className='demo-app-sidebar-section'>
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <label>
//           <input
//             type='checkbox'
//             checked={weekendsVisible}
//             onChange={handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <h2>All Events ({currentEvents.length})</h2>
//         <ul>
//           {currentEvents.map((event) => (
//             <SidebarEvent key={event.id} event={event} />
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// function SidebarEvent({ event }) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function DemoApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleApiKey, setGoogleApiKey] = useState('AIzaSyAygIsrO9yITmaYM9PeEQdec5H2-upsEVY'); // Set your Google Calendar API key
  const [googleCalendarId, setGoogleCalendarId] = useState(''); // Store user's Google Calendar ID

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    setIsLoggedIn(true);
    // Store Google Calendar ID (You can replace with the user's actual calendar ID)
    setGoogleCalendarId('primary'); // This sets the primary Google Calendar ID (or use actual user ID from API)
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Failed:', error);
  };

  return (
    <div className="demo-app">
      <header className="welcome-header">
        <h1>Hello, Welcome to Synchronize!</h1>
        <p>Please login with Google to sync your Google Calendar</p>
      </header>

      {/* Google Login Button */}
      {!isLoggedIn && (
        <GoogleOAuthProvider clientId="835837943858-q18ncb55nr2liamrep0pcmhl7orhstk2.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </GoogleOAuthProvider>
      )}

      {/* FullCalendar Display */}
      {isLoggedIn && (
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
            googleCalendarApiKey={googleApiKey}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            events={{
              googleCalendarId: googleCalendarId, // Display events from the user's Google Calendar
            }}
          />
        </div>
      )}
    </div>
  );
}
