import React, { useEffect, useState } from "react";

function ViewOpportunities() {

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [opportunities, setOpportunities] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loadingApplyId, setLoadingApplyId] = useState(null);
  const [applications, setApplications] = useState({});
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");


  // FETCH OPPORTUNITIES
  useEffect(() => {

    fetch("http://localhost:5000/api/opportunities")
      .then(res => res.json())
      .then(data => setOpportunities(data))
      .catch(err => console.log(err));

  }, []);


  // FETCH VOLUNTEER APPLICATIONS
  useEffect(() => {

    if (!user || user.role?.toLowerCase() !== "volunteer") return;

    fetch(`http://localhost:5000/api/applications/user/${user._id}`)
      .then(res => res.json())
      .then(data => {

        const ids = data.map(app => app.opportunityId);

        setAppliedIds(ids);

      })
      .catch(err => console.log(err));

  }, [user]);


  // FETCH NGO APPLICATIONS
  useEffect(() => {

    if (!user || user.role?.toLowerCase() !== "ngo") return;

    opportunities.forEach((opp) => {

      fetch(`http://localhost:5000/api/applications/opportunity/${opp._id}`)
        .then(res => res.json())
        .then(data => {

          setApplications(prev => ({
            ...prev,
            [opp._id]: data
          }));

        })
        .catch(err => console.log(err));

    });

  }, [opportunities, user]);


  // APPLY FUNCTION
  const handleApply = async (opportunityId) => {

    if (!user) {
      alert("Please login first");
      return;
    }

    setLoadingApplyId(opportunityId);

    try {

      const res = await fetch(
        "http://localhost:5000/api/applications/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            volunteerId: user._id,
            opportunityId
          })
        }
      );

      const data = await res.json();

      alert(data.message);

      if (data.message === "Application submitted successfully") {

        setAppliedIds(prev => [...prev, opportunityId]);

      }

    } catch (error) {

      console.log(error);

    }

    setLoadingApplyId(null);

  };


  // ACCEPT / REJECT
  const updateStatus = async (applicationId, status, opportunityId) => {

    try {

      await fetch(
        `http://localhost:5000/api/applications/update-status/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status })
        }
      );

      setApplications(prev => ({
        ...prev,
        [opportunityId]: prev[opportunityId].map(app =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      }));

    } catch (error) {

      console.log(error);

    }

  };


  return (
    <div className="p-8">

      <h2 className="text-2xl font-bold mb-6">
        All Opportunities
      </h2>


      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search opportunities..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* LOCATION FILTER */}
      <select
        className="border p-2 mb-6"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Remote">Remote</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
      </select>


      {opportunities
        .filter((opp) =>
          (opp.title || "").toLowerCase().includes(search.toLowerCase()) &&
          (locationFilter === "" || opp.location === locationFilter)
        )
        .map((opp) => (

        <div
          key={opp._id}
          className="border p-4 mb-4 rounded shadow bg-white"
        >

          <h3 className="font-bold text-lg">
            {opp.title}
          </h3>

          <p>{opp.description}</p>

          <p>
            <strong>Location:</strong> {opp.location}
          </p>

          <p>
            <strong>Duration:</strong> {opp.duration}
          </p>

          <p>
            <strong>Skills:</strong>
            {Array.isArray(opp.required_skills)
              ? opp.required_skills.join(", ")
              : ""}
          </p>


          {/* VOLUNTEER APPLY BUTTON */}
          {user && user.role?.toLowerCase() === "volunteer" && (

            <button
              onClick={() => handleApply(opp._id)}
              disabled={loadingApplyId === opp._id}
              className={`px-3 py-1 mt-3 rounded text-white ${
                loadingApplyId === opp._id
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500"
              }`}
            >

              {loadingApplyId === opp._id
                ? "Applying..."
                : appliedIds.includes(opp._id)
                ? "Applied"
                : "Apply"}

            </button>

          )}


          {/* NGO APPLICATION VIEW */}
          {user && user.role?.toLowerCase() === "ngo" && (

            <div className="mt-4">

              <h4 className="font-semibold">
                Volunteer Applications
              </h4>

              {applications[opp._id]?.length === 0 && (
                <p>No volunteers applied yet</p>
              )}

              {Array.isArray(applications[opp._id]) &&
                applications[opp._id].map(app => (

                <div
                  key={app._id}
                  className="border p-2 mt-2 rounded"
                >

                  <p>
                    <strong>Name:</strong>
                    {app.volunteerId?.name}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    {app.volunteerId?.email}
                  </p>

                  <p>
                    <strong>Status:</strong>

                    <span className={`ml-2 px-2 py-1 rounded text-white ${
                      app.status === "accepted"
                        ? "bg-green-500"
                        : app.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}>
                      {app.status}
                    </span>

                  </p>

                  <button
                    onClick={() =>
                      updateStatus(app._id, "accepted", opp._id)
                    }
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(app._id, "rejected", opp._id)
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      ))}

    </div>
  );
}

export default ViewOpportunities;