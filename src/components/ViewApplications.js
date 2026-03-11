import React, { useEffect, useState } from "react";

function ViewApplications({ opportunityId }) {

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    fetch(`http://localhost:5000/api/applications/opportunity/${opportunityId}`)
      .then(res => res.json())
      .then(data => setApplications(data));

  }, [opportunityId]);


  const updateStatus = async (id, status) => {

    await fetch(
      `http://localhost:5000/api/applications/update-status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    );

    setApplications(prev =>
      prev.map(app =>
        app._id === id ? { ...app, status } : app
      )
    );

  };


  return (
    <div className="mt-3">

      <h4 className="font-bold">Volunteer Applications</h4>

      {applications.length === 0 && (
        <p>No volunteers applied yet</p>
      )}

      {applications.map(app => (

        <div
          key={app._id}
          className="border p-2 mt-2 rounded"
        >

          <p><strong>Name:</strong> {app.volunteerId?.name}</p>
          <p><strong>Email:</strong> {app.volunteerId?.email}</p>
          <p><strong>Status:</strong> {app.status}</p>

          <button
            onClick={() => updateStatus(app._id, "accepted")}
            className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
          >
            Accept
          </button>

          <button
            onClick={() => updateStatus(app._id, "rejected")}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Reject
          </button>

        </div>

      ))}

    </div>
  );
}

export default ViewApplications;