import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Calendar } from '@fullcalendar/core';

export default function DemoApp() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
const handleGoogleLoginSuccess = (credentialResponse) => {
      console.log('Google Login Success:', credentialResponse);
      setIsLoggedIn(true);
      // Store Google Calendar ID (You can replace with the user's actual calendar ID)
     // setGoogleCalendarId('primary'); // This sets the primary Google Calendar ID (or use actual user ID from API)
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

      {/* FullCalendar Component */}
      {isLoggedIn && (
        <div className="demo-app-main">
         <FullCalendar
        plugins={[googleCalendarPlugin, dayGridPlugin]}  // Use the plugins here
        initialView="dayGridMonth"  // Set the initial view
        googleCalendarApiKey='AIzaSyAygIsrO9yITmaYM9PeEQdec5H2-upsEVY'  // Add your Google Calendar API key here
        events={{
          googleCalendarId: 'c881ffd9a11de496c10ecfa79ec51fe60c807ecb88d7ecaa8fae5ef7e5e85634@group.calendar.google.com',  // Google Calendar ID for fetching events
        }}
                  />
                </div>
              )}
            </div>
          );
        }


//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [googleApiKey, setGoogleApiKey] = useState('AIzaSyAygIsrO9yITmaYM9PeEQdec5H2-upsEVY'); // Set your Google Calendar API key
//   const [googleCalendarId, setGoogleCalendarId] = useState(''); // Store user's Google Calendar ID

//   const handleGoogleLoginSuccess = (credentialResponse) => {
//     console.log('Google Login Success:', credentialResponse);
//     setIsLoggedIn(true);
//     // Store Google Calendar ID (You can replace with the user's actual calendar ID)
//     setGoogleCalendarId('primary'); // This sets the primary Google Calendar ID (or use actual user ID from API)
//   };

//   const handleGoogleLoginFailure = (error) => {
//     console.log('Google Login Failed:', error);
//   };

//   return (
//     <div className="demo-app">
//       <header className="welcome-header">
//         <h1>Hello, Welcome to Synchronize!</h1>
//         <p>Please login with Google to sync your Google Calendar</p>
//       </header>

//       {/* Google Login Button */}
//       {!isLoggedIn && (
//         <GoogleOAuthProvider clientId="835837943858-q18ncb55nr2liamrep0pcmhl7orhstk2.apps.googleusercontent.com">
//           <GoogleLogin
//             onSuccess={handleGoogleLoginSuccess}
//             onError={handleGoogleLoginFailure}
//           />
//         </GoogleOAuthProvider>
//       )}

//       {/* FullCalendar Display */}
//       {isLoggedIn && (
//         <div className="demo-app-main">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
//             googleCalendarApiKey={'AIzaSyAygIsrO9yITmaYM9PeEQdec5H2'}
//             headerToolbar={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'dayGridMonth,timeGridWeek,timeGridDay',
//             }}
//             initialView="dayGridMonth"
//             events={{
//               googleCalendarId: 'eileendong1@gmail.com', // Display events from the user's Google Calendar
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
//}
