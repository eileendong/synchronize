import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function DemoApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // State for user's email

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    setIsLoggedIn(true);

    const idToken = credentialResponse.credential;
    const payload = idToken.split('.')[1]; // Get the payload part
    const decodedPayload = JSON.parse(atob(payload)); // Decode Base64 and parse JSON

    // Retrieve the user's email and update state
    const email = decodedPayload.email;
    setUserEmail(email); // Store email in state
    console.log(email);
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
      {isLoggedIn && userEmail && (
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
            initialView="timeGridWeek" // Set the initial view
            googleCalendarApiKey="AIzaSyAygIsrO9yITmaYM9PeEQdec5H2-upsEVY" // Add your Google Calendar API key here
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay,dayGridMonth',
            }}
            // events={{
            //   googleCalendarId: userEmail, 'eileendingdong1@gmail.com',// Use state to dynamically set the calendar ID
            // }}
            eventSources={[
              {
                googleCalendarId: userEmail
              },
              // {
              //   googleCalendarId: 'cs.washington.edu_kpim983lg1a6mctsbup4ftg2l4@group.calendar.google.com',
              // }
            ]}
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
