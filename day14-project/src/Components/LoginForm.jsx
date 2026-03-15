import React, { useState } from "react";
import "../styles.css";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setErrors(validate(updatedData));
  };

 
  const validate = (data) => {
    let newErrors = {};
    if (!data.email.includes("@")) {
      newErrors.email = "Valid email required";
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      newErrors.password = "Password must be 6+ chars, 1 uppercase, 1 number";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Login Successful!");
      setErrors({});
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>

        {}
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {}
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className="toggle-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "" : ""}
          </span>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {}
        <div className="options">
          <label>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit">Login</button>

        <p className="register-link">
          Don’t have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;