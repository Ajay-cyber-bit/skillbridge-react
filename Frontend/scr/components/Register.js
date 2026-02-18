import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

function Register({ switchToLogin }) {

  const [role, setRole] = useState("volunteer");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    organizationName: "",
    organizationDescription: "",
    websiteUrl: ""
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [skillsError, setSkillsError] = useState("");
  const [ngoError, setNgoError] = useState("");

  const skillsList = [
    "Web Development",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Data Analysis",
    "Mobile App Development",
    "Teaching",
    "Translation",
    "Event Management"
  ];

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // Add skill
  const handleSkillSelect = (skill) => {

    if (!selectedSkills.includes(skill)) {

      setSelectedSkills([...selectedSkills, skill]);

    }

  };

  // Remove skill
  const removeSkill = (skill) => {

    setSelectedSkills(
      selectedSkills.filter(s => s !== skill)
    );

  };


  const handleSubmit = () => {

    let valid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setSkillsError("");
    setNgoError("");

    if (!formData.name.trim()) {
      setNameError("Name required");
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email");
      valid = false;
    }

    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be strong (8 chars, uppercase, lowercase, number, special char)"
      );
      valid = false;
    }

    if (role === "volunteer" && selectedSkills.length === 0) {
      setSkillsError("Select at least one skill");
      valid = false;
    }

    if (role === "ngo" &&
        (!formData.organizationName ||
         !formData.organizationDescription)) {

      setNgoError("All NGO fields required");
      valid = false;

    }

    if (!valid) return;

    alert("Registration successful");

  };


  return (

    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold text-center mb-6">
        Create Account
      </h2>


      {/* Name */}
      <div className="mb-4">

        <label>Name *</label>

        <input
          name="name"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <p className="text-red-500 text-sm">
          {nameError}
        </p>

      </div>


      {/* Email */}
      <div className="mb-4">

        <label>Email *</label>

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

        <label>Password *</label>

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


      {/* Role */}
      <div className="mb-4">

        <label>Register as</label>

        <select
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="w-full border px-3 py-2 rounded-lg"
        >

          <option value="volunteer">
            Volunteer
          </option>

          <option value="ngo">
            NGO
          </option>

        </select>

      </div>


      {/* Skills Dropdown */}
      {role === "volunteer" && (

        <div className="mb-4">

          <label>Select Skills *</label>

          <select
            onChange={(e) =>
              handleSkillSelect(e.target.value)
            }
            className="w-full border px-3 py-2 rounded-lg"
          >

            <option value="">
              Select Skill
            </option>

            {skillsList.map(skill => (

              <option key={skill}>
                {skill}
              </option>

            ))}

          </select>


          {/* Selected skills tags */}
          <div className="flex flex-wrap mt-2 gap-2">

            {selectedSkills.map(skill => (

              <div
                key={skill}
                className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
              >

                {skill}

                <FaTimes
                  className="cursor-pointer"
                  onClick={() =>
                    removeSkill(skill)
                  }
                />

              </div>

            ))}

          </div>

          <p className="text-red-500 text-sm">
            {skillsError}
          </p>

        </div>

      )}


      {/* NGO fields */}
      {role === "ngo" && (

        <div>

          <input
            name="organizationName"
            placeholder="Organization Name"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg mb-2"
          />

          <textarea
            name="organizationDescription"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
          />

          <p className="text-red-500 text-sm">
            {ngoError}
          </p>

        </div>

      )}


      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-lg mt-4"
      >
        Register
      </button>


      <p className="text-center mt-4">

        Already have account?

        <span
          onClick={switchToLogin}
          className="text-blue-600 cursor-pointer ml-1"
        >
          Login
        </span>

      </p>

    </div>

  );

}

export default Register;
