// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async () => {
    // 클라이언트에서 서버로 요청을 보내는 부분
    try {
      const response = await fetch('/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: toEmail, subject, text: message }),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
      <div className="App">
        <h1>Email Sender</h1>
        <div>
          <label>To Email:</label>
          <input type="email" value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <button onClick={handleSendEmail}>Send Email</button>
      </div>
  );
}

export default App;
