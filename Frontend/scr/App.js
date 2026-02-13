import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {

  // page control state
  const [page, setPage] = useState("home");

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center space-x-3">

          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="logo"
            className="w-10"
          />

          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => setPage("home")}
          >
            Skill Bridge
          </h1>

        </div>


        {/* Center Menu */}
        <div className="hidden md:flex space-x-8 font-medium">

          <button
            onClick={() => setPage("home")}
            className="hover:text-blue-600"
          >
            Home
          </button>

          <button
            onClick={() => setPage("opportunities")}
            className="hover:text-blue-600"
          >
            Opportunities
          </button>

          <button
            onClick={() => setPage("about")}
            className="hover:text-blue-600"
          >
            About
          </button>

          <button
            onClick={() => setPage("contact")}
            className="hover:text-blue-600"
          >
            Contact
          </button>

        </div>


        {/* Right Buttons */}
        <div className="space-x-3">

          <button
            onClick={() => setPage("login")}
            className="border border-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white"
          >
            Login
          </button>

          <button
            onClick={() => setPage("register")}
            className="border border-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white"
          >
            Register
          </button>

        </div>

      </div>


      {/* Page Content */}

      {page === "home" && (
        <Home
          goToLogin={() => setPage("login")}
          goToRegister={() => setPage("register")}
        />
      )}


      {page === "login" && (
        <div className="flex justify-center items-center mt-16">
          <Login switchToRegister={() => setPage("register")} />
        </div>
      )}


      {page === "register" && (
        <div className="flex justify-center items-center mt-16">
          <Register switchToLogin={() => setPage("login")} />
        </div>
      )}


      {/* Temporary Pages */}

      {page === "opportunities" && (
        <div className="text-center mt-20 text-2xl font-semibold">
          Opportunities Page (Coming Soon)
        </div>
      )}

      {page === "about" && (
        <div className="text-center mt-20 text-2xl font-semibold">
          About Page (Coming Soon)
        </div>
      )}

      {page === "contact" && (
        <div className="text-center mt-20 text-2xl font-semibold">
          Contact Page (Coming Soon)
        </div>
      )}

    </div>

  );

}

export default App;
