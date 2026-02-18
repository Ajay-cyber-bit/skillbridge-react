import React from "react";

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";


function App() {

  return (

    <div className="min-h-screen bg-gray-100">


      {/* HEADER / NAVBAR */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">


        {/* Logo */}
        <h1 className="text-xl font-bold">
          Skill Bridge
        </h1>


        {/* CENTER MENU */}
        <div className="space-x-6 font-medium">

          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/opportunities" className="hover:text-blue-600">
            Opportunities
          </Link>

          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>

        </div>


        {/* RIGHT MENU */}
        <div className="space-x-3">

          <Link to="/login">
            <button className="border border-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="border border-blue-600 px-4 py-1 rounded-md hover:bg-blue-600 hover:text-white">
              Register
            </button>
          </Link>

        </div>

      </div>


      {/* ROUTES */}
      <Routes>


        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* LOGIN CENTERED */}
        <Route
          path="/login"
          element={
            <div className="flex justify-center items-center min-h-[80vh]">
              <Login />
            </div>
          }
        />


        {/* REGISTER CENTERED */}
        <Route
          path="/register"
          element={
            <div className="flex justify-center items-center min-h-[80vh]">
              <Register />
            </div>
          }
        />


        {/* OTHER PAGES */}
        <Route
          path="/opportunities"
          element={
            <div className="text-center mt-20 text-2xl">
              Opportunities Page
            </div>
          }
        />


        <Route
          path="/about"
          element={
            <div className="text-center mt-20 text-2xl">
              About Page
            </div>
          }
        />


        <Route
          path="/contact"
          element={
            <div className="text-center mt-20 text-2xl">
              Contact Page
            </div>
          }
        />


      </Routes>


    </div>

  );

}

export default App;
