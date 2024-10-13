// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// export default function DemoApp() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState(''); // State for user's email

//   const [inputName, setInputName] = useState(''); // Renamed `name` to `inputName`
//   const [namesList, setNamesList] = useState([]); // Renamed and properly defined
//   const [removeName, setRemoveName] = useState(''); // input for name to remove
//   const [calendarId, setCalendarId] = useState(''); // State for storing calendar ID

//   const handleGoogleLoginSuccess = (credentialResponse) => {
//     console.log('Google Login Success:', credentialResponse);
//     setIsLoggedIn(true);

//     const idToken = credentialResponse.credential;
//     const payload = idToken.split('.')[1]; // Get the payload part
//     const decodedPayload = JSON.parse(atob(payload)); // Decode Base64 and parse JSON

//     // Retrieve the user's email and update state
//     const email = decodedPayload.email;
//     setUserEmail(email); // Store email in state
//     console.log(email);
//   };

//   const handleGoogleLoginFailure = (error) => {
//     console.log('Google Login Failed:', error);
//   };
//  //adding names
//  const handleAddName = () => {
//   if (inputName.trim() !== '') {
//     setNamesList((prevNames) => [...prevNames, inputName]);
//     setInputName(''); // Clear the input after adding
//   }
// };

// // Handle removing a name from the dropdown
// const handleRemoveName = () => {
//   if (removeName.trim() !== '' && namesList.includes(removeName)) {
//     setNamesList((prevNames) => prevNames.filter((name) => name !== removeName));
//     setRemoveName(''); // Clear input after removing the name
//   }
// };

// //Handle submit
// const handleSubmitCalendarId = () => {
//   if (calendarId.trim() !== '') {
//     console.log('Submitted Calendar ID:', calendarId);
//     // Perform actions with the calendar ID (e.g., fetching events)
//     setCalendarId(''); // Clear the input after submitting
//   }
// };


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

//       {/* FullCalendar Component */}
      
//       {isLoggedIn && userEmail && (
        
//          <>
//           <div className="demo-app-main" style={{ margin: "50px 15px 30px 15px" }}></div>
//          {/* Input for person's name */}
//          <div className="name-input">
//            <input 
//              type="text" 
//              value={inputName}  // Updated to use `inputName`
//              onChange={(e) => setInputName(e.target.value)}  // Updated to use `setInputName`
//              placeholder="Enter friend's name"
//            />
//            <button onClick={handleAddName}>Synchronize</button>
//          </div>

         

//          {/* Dropdown to show added names */}
//          {/* {namesList.length > 0 && (
//            <div className="dropdown-menu">
//              <select>
//                {namesList.map((person, index) => (
//                  <option key={index} value={person}>{person}</option>
//                ))}
//              </select>
//            </div>

         
         

//          )} */}

// {namesList.length > 0 && (
//            <>
//              {/* Dropdown to show added names */}
//              <div className="dropdown-menu">
//              <select>
//                {namesList.map((person, index) => (
//                  <option key={index} value={person}>
//                    {person}
//                  </option>
//                ))}
//              </select>
//              </div>

//              {/* Input for removing a person */}
//              <div className="remove-input">
//                <input
//                  type="text"
//                  value={removeName}
//                  onChange={(e) => setRemoveName(e.target.value)}
//                  placeholder="Enter name to remove"
//                />
//                <button onClick={handleRemoveName}>Remove</button>
//              </div>
//            </>
//          )}


//          {/* Input for calendar ID */}
//          <div className="calendar-id-input">
//            <h3>Please submit the email of the Google Calender you want to sync (Or Calendar ID)</h3>
//            <input 
//              type="text" 
//              placeholder="Enter your email" 
//              value={calendarId} 
//              onChange={(e) => setCalendarId(e.target.value)} 
//            />
//            <button onClick={handleSubmitCalendarId}>Submit</button>
//          </div>


//         <div className="demo-app-main">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
//             initialView="timeGridWeek" // Set the initial view
//             googleCalendarApiKey="AIzaSyAygIsrO9yITmaYM9PeEQdec5H2-upsEVY" // Add your Google Calendar API key here
//             headerToolbar={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'timeGridWeek,timeGridDay,dayGridMonth',
//             }}
//             // events={{
//             //   googleCalendarId: userEmail, 'eileendingdong1@gmail.com',// Use state to dynamically set the calendar ID
//             // }}
//             eventSources={[
//               {
//                 googleCalendarId: userEmail
//               },
//               // {
//               //   googleCalendarId: 'cs.washington.edu_kpim983lg1a6mctsbup4ftg2l4@group.calendar.google.com',
//               // }
//             ]}
//             />
//           </div>
//           console.print(calendarId);
//         </>
//       )}
//     </div>
//   );
// }

// this is neha's comment :D

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

  const [inputName, setInputName] = useState(''); // Renamed `name` to `inputName`
  const [namesList, setNamesList] = useState([]); // Renamed and properly defined
  const [removeName, setRemoveName] = useState(''); // input for name to remove
  const [calendarId, setCalendarId] = useState(''); // State for storing calendar ID

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
 //adding names
 const handleAddName = () => {
  if (inputName.trim() !== '') {
    setNamesList((prevNames) => [...prevNames, inputName]);
    setInputName(''); // Clear the input after adding
  }
};

// Handle removing a name from the dropdown
const handleRemoveName = () => {
  if (removeName.trim() !== '' && namesList.includes(removeName)) {
    setNamesList((prevNames) => prevNames.filter((name) => name !== removeName));
    setRemoveName(''); // Clear input after removing the name
  }
};

//Handle submit
const handleSubmitCalendarId = () => {
  if (calendarId.trim() !== '') {
    console.log('Submitted Calendar ID:', calendarId);
    // Perform actions with the calendar ID (e.g., fetching events)
    setCalendarId(''); // Clear the input after submitting
  }
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
        <>
          <div className="form-section">
            {/* Input for person's name */}
            <div className="input-group">
              <input 
                type="text" 
                value={inputName}  // Updated to use `inputName`
                onChange={(e) => setInputName(e.target.value)}  // Updated to use `setInputName`
                placeholder="Enter friend's name"
                className="input-field"
              />
              <button className="btn synchronize-btn" onClick={handleAddName}>Synchronize</button>
            </div>

            {namesList.length > 0 && (
              <>
                {/* Dropdown to show added names */}
                <div className="dropdown-menu">
                  <select className="dropdown">
                    {namesList.map((person, index) => (
                      <option key={index} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Input for removing a person */}
                <div className="input-group">
                  <input
                    type="text"
                    value={removeName}
                    onChange={(e) => setRemoveName(e.target.value)}
                    placeholder="Enter name to remove"
                    className="input-field"
                  />
                  <button className="btn remove-btn" onClick={handleRemoveName}>Remove</button>
                </div>
              </>
            )}

            {/* Input for calendar ID */}
            <div className="input-group calendar-id-input">
              <h3>Please submit the email of the Google Calendar you want to sync (Or Calendar ID)</h3>
              <input 
                type="text" 
                placeholder="Enter your email or Calendar ID" 
                value={calendarId} 
                onChange={(e) => setCalendarId(e.target.value)} 
                className="input-field"
              />
              <button className="btn submit-btn" onClick={handleSubmitCalendarId}>Submit</button>
            </div>
          </div>

          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
              initialView="timeGridWeek" // Set the initial view
              googleCalendarApiKey="AIzaSyAygIsrO9yITmaYM9PeEQdec5H2-upsEVY" // Add your Google Calendar API key here
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek,timeGridDay,dayGridMonth',
              }}
              eventSources={[
                {
                  googleCalendarId: userEmail
                },
              ]}
            />
          </div>
        </>
      )}

      {/* Inline CSS Styles */}
      <style jsx>{`
        .demo-app {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 1500px;
          margin: 0 auto;
        }
        
        .welcome-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .form-section {
          margin-bottom: 40px;
          text-align: center;
        }

        .input-group {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .input-field {
          padding: 12px;
          width: 350px;
          border-radius: 5px;
          border: 1px solid #ccc;
          margin-right: 10px;
          font-size: 16px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .synchronize-btn {
          background-color: #007bff;
          color: white;
        }

        .remove-btn {
          background-color: #ff4d4d;
          color: white;
        }

        .submit-btn {
          background-color: #28a745;
          color: white;
        }

        .dropdown-menu {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }

        .dropdown {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 360px;
          font-size: 16px;
        }

        .calendar-container {
          margin-top: 30px;
        }

        h3 {
          text-align: center;
          margin-bottom: 10px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
