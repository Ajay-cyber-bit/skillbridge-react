import React from "react";

function OpportunityCard({ opportunity }) {

  const applyForOpportunity = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch("http://localhost:5000/api/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          volunteerId: userId,
          opportunityId: opportunity._id,
        }),
      });

      const data = await res.json();
      alert(data.message);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="border p-4 rounded shadow mb-4">

      <h2 className="text-xl font-bold">{opportunity.title}</h2>

      <p>{opportunity.description}</p>

      <p>Location: {opportunity.location}</p>

      <p>Duration: {opportunity.duration}</p>

      <button
        onClick={applyForOpportunity}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
      >
        Apply
      </button>

    </div>
  );
}

export default OpportunityCard;