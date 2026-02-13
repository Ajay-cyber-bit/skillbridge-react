import React from "react";

function Register({ switchToLogin }) {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Role</label>
        <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Select Role</option>
          <option>Student</option>
          <option>Instructor</option>
        </select>
      </div>

      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
        Register
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-600 cursor-pointer font-medium hover:underline"
        >
          Login
        </span>
      </p>

    </div>
  );
}

export default Register;
