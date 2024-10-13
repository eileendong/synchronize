
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function DemoApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // State for user's email
  const [namesList, setNamesList] = useState([]); // List for calendar IDs
  const [removeName, setRemoveName] = useState(''); // Input for name to remove
  const [calendarId, setCalendarId] = useState(''); // State for storing calendar ID
  let [inputCalendarList, setInputCalendarList] = useState([]); // List of calendars to sync

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    setIsLoggedIn(true);

    const idToken = credentialResponse.credential;
    const payload = idToken.split('.')[1]; // Get the payload part
    const decodedPayload = JSON.parse(atob(payload)); // Decode Base64 and parse JSON

    // Retrieve the user's email and update state
    const email = decodedPayload.email;
    setUserEmail(email);

    // Add user's primary calendar (email) to the list by default
    setNamesList([{ id: email, isChecked: true, isDefault: true }]); // Default checked and marked as default
    setInputCalendarList([{ googleCalendarId: email, color: 'purple' }]); // Default calendar in sync list
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google Login Failed:', error);
  };

  // Handle submit for calendar ID
  const handleSubmitCalendarId = () => {
    if (calendarId.trim() !== '') {
      console.log('Submitted Calendar ID:', calendarId);
      // Add new calendar ID to namesList and inputCalendarList
      setNamesList((prevNames) => [...prevNames, { id: calendarId, isChecked: true, isDefault: false }]);

      const newColor = getRandomColor(); // Get random RGB color
      setInputCalendarList(inputCalendarList => [
        ...inputCalendarList,
        { googleCalendarId: calendarId, color: newColor }
      ]);
      setCalendarId(''); // Clear the input after submitting
    }
  };

  // Handle checkbox selection for synchronizing calendars
  const handleCheckboxChange = (index) => {
    const updatedNamesList = [...namesList];
    updatedNamesList[index].isChecked = !updatedNamesList[index].isChecked;

    // Update inputCalendarList based on checkbox selection
    const updatedCalendarList = updatedNamesList
      .filter(name => name.isChecked)
      .map(name => ({
        googleCalendarId: name.id,
        color: name.isDefault ? 'purple' : inputCalendarList.find(calendar => calendar.googleCalendarId === name.id)?.color || getRandomColor()
      }));

    setNamesList(updatedNamesList);
    setInputCalendarList(updatedCalendarList);
  };

  // Handle removing a calendar (excluding default calendar)
  const handleRemoveName = () => {
    // Ensure default calendar is not removed
    const updatedNamesList = namesList.filter((name) => name.id !== removeName && !name.isDefault);

    // Update calendar list by removing the corresponding calendar
    const updatedCalendarList = updatedNamesList
      .filter(name => name.isChecked)
      .map(name => ({ googleCalendarId: name.id, color: name.isDefault ? 'purple' : 'blue' }));

    setNamesList(updatedNamesList); // Remove the calendar from the namesList
    setInputCalendarList(updatedCalendarList); // Update inputCalendarList for the calendar view
    setRemoveName(''); // Clear the input
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

          {/* Input for calendar ID */}
          <div className="calendar-id-input">
            <h3>Please submit the email of the Google Calendar you want to sync (Or Calendar ID)</h3>
            <input 
              type="text" 
              placeholder="Enter the email or Calendar ID" 
              value={calendarId} 
              onChange={(e) => setCalendarId(e.target.value)} 
              className="input-field"
            />
            <button className="btn submit-btn" onClick={handleSubmitCalendarId}>Synchronize</button>
          </div>

          {namesList.length > 0 && (
            <>
              {/* Checkbox List to show added names */}
              <div className="checkbox-list">
                {namesList.map((person, index) => (
                  <label key={index} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={person.isChecked}
                      onChange={() => handleCheckboxChange(index)}
                      disabled={person.isDefault} // Disable the checkbox for the default calendar
                    />
                    {person.id} {person.isDefault && '(Default)'}
                  </label>
                ))}
              </div>

              {/* Input for removing a person */}
              {/* <div className="remove-input">
                <input
                  type="text"
                  value={removeName}
                  onChange={(e) => setRemoveName(e.target.value)}
                  placeholder="Enter calendar ID to remove"
                  className="input-field"
                />
                <button className="btn remove-btn" onClick={handleRemoveName}>Remove</button>
              </div> */}
            </>
          )}

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
              eventSources={inputCalendarList}
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
          border-radius: 10px;
        }

        .checkbox-list {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-bottom: 20px;
        }

        .checkbox-item {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}
