import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ switchToRegister }) {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleLogin = async () => {

    setEmailError("");
    setPasswordError("");

    if (!formData.email) {

      setEmailError("Email required");
      return;

    }

    if (!formData.password) {

      setPasswordError("Password required");
      return;

    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)

        }
      );

      const data = await response.json();


      if (data.message === "Login successful") {

        alert("Login successful");

        // save user in localStorage
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

      }
      else {

        alert(data.message);

      }

    }
    catch (error) {

      alert("Server error");

    }

  };


  return (

    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold text-center mb-6">
        Login
      </h2>


      {/* Email */}
      <div className="mb-4">

        <label>Email</label>

        <input
          name="email"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <p className="text-red-500 text-sm">
          {emailError}
        </p>

      </div>


      {/* Password */}
      <div className="mb-4">

        <label>Password</label>

        <div className="relative">

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-3"
          >
            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}
          </button>

        </div>

        <p className="text-red-500 text-sm">
          {passwordError}
        </p>

      </div>


      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Login
      </button>


      <p className="text-center mt-4">

        Don't have account?

        <span
          onClick={switchToRegister}
          className="text-blue-600 cursor-pointer ml-1"
        >
          Register
        </span>

      </p>

    </div>

  );

}

export default Login;
