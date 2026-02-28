import React, { useEffect, useState } from "react";

function ViewOpportunities() {

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/opportunities")
      .then(res => res.json())
      .then(data => setOpportunities(data))
      .catch(err => console.log(err));
  }, []);

  const deleteOpportunity = async (id) => {

    await fetch(`http://localhost:5000/api/opportunities/${id}`, {
      method: "DELETE"
    });

    setOpportunities(
      opportunities.filter((opp) => opp._id !== id)
    );
  };

  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-6">
        All Opportunities
      </h2>

      {opportunities.length === 0 && (
        <p>No opportunities available.</p>
      )}

      {opportunities.map((opp) => (

        <div
          key={opp._id}
          className="border p-4 mb-4 rounded shadow bg-white"
        >

          <h3 className="font-bold text-lg">
            {opp.title}
          </h3>

          <p className="mb-2">
            {opp.description}
          </p>

          <p className="text-sm">
            <strong>Location:</strong> {opp.location}
          </p>

          <p className="text-sm">
            <strong>Duration:</strong> {opp.duration}
          </p>

          <p className="text-sm">
            <strong>Skills:</strong> {opp.required_skills?.join(", ")}
          </p>

          {/* NGO can delete */}
          {user && user.role.toLowerCase() === "ngo" && (
            <button
              onClick={() => deleteOpportunity(opp._id)}
              className="bg-red-500 text-white px-3 py-1 mt-3 rounded"
            >
              Delete
            </button>
          )}

          {/* Volunteer can apply */}
          {user && user.role.toLowerCase() === "volunteer" && (
            <button
              className="bg-blue-500 text-white px-3 py-1 mt-3 rounded"
            >
              Apply
            </button>
          )}

        </div>

      ))}

    </div>
  );
}

export default ViewOpportunities;