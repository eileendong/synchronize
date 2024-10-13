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
          <div className="demo-app-main" style={{ margin: "50px 15px 30px 15px" }}></div>
         {/* Input for person's name */}
         <div className="name-input">
           <input 
             type="text" 
             value={inputName}  // Updated to use `inputName`
             onChange={(e) => setInputName(e.target.value)}  // Updated to use `setInputName`
             placeholder="Enter friend's name"
           />
           <button onClick={handleAddName}>Synchronize</button>
         </div>

         

         {/* Dropdown to show added names */}
         {/* {namesList.length > 0 && (
           <div className="dropdown-menu">
             <select>
               {namesList.map((person, index) => (
                 <option key={index} value={person}>{person}</option>
               ))}
             </select>
           </div>

         
         

         )} */}

{namesList.length > 0 && (
           <>
             {/* Dropdown to show added names */}
             <div className="dropdown-menu">
             <select>
               {namesList.map((person, index) => (
                 <option key={index} value={person}>
                   {person}
                 </option>
               ))}
             </select>
             </div>

             {/* Input for removing a person */}
             <div className="remove-input">
               <input
                 type="text"
                 value={removeName}
                 onChange={(e) => setRemoveName(e.target.value)}
                 placeholder="Enter name to remove"
               />
               <button onClick={handleRemoveName}>Remove</button>
             </div>
           </>
         )}


         {/* Input for calendar ID */}
         <div className="calendar-id-input">
           <h3>Please submit the email of the Google Calender you want to sync (Or Calendar ID)</h3>
           <input 
             type="text" 
             placeholder="Enter your email" 
             value={calendarId} 
             onChange={(e) => setCalendarId(e.target.value)} 
           />
           <button onClick={handleSubmitCalendarId}>Submit</button>
         </div>


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
          console.print(calendarId);
        </>
      )}
    </div>
  );
}

