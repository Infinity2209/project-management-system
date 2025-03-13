import React from 'react';

const CustomerPortal = () => {
  const projects = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
    { id: 3, name: 'Project C' },
  ];

  return (
    <div>
      <h1>Customer Portal</h1>
      <h2>Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <button onClick={() => alert('Request submitted!')}>Submit Request</button>
    </div>
  );
};


export default CustomerPortal;
