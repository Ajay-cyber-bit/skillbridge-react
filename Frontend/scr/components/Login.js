import React from "react";

function Login({ switchToRegister }) {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

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

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Login
      </button>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-600 cursor-pointer font-medium hover:underline"
        >
          Register
        </span>
      </p>

    </div>
  );
}

export default Login;
