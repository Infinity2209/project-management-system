import React from 'react';

const AdminPanel = () => {
  const requests = [
    { id: 1, description: 'Request A' },
    { id: 2, description: 'Request B' },
    { id: 3, description: 'Request C' },
  ];

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>User Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>{request.description}</li>
        ))}
      </ul>
      <button onClick={() => alert('Request approved!')}>Approve Request</button>
    </div>
  );
};


export default AdminPanel;
