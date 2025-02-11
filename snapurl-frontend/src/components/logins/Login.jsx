import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form
          className="bg-white p-4 rounded shadow"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="text-center text-primary mb-4 position-relative">
            Login
            <span
              className="position-absolute rounded-circle bg-primary blink"
              style={{
                width: "16px",
                height: "16px",
                top: "50%",
                left: "-10px",
                transform: "translateY(-50%)",
              }}
            ></span>
          </h2>
          <p className="text-muted text-center mb-3">
            Welcome back! Please login to your account.
          </p>
          <div className="form-floating mb-3">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-4 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control pe-5"
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
            <span
              className="position-absolute top-50 translate-middle-y end-0 me-3"
              style={{ cursor: "pointer", fontSize: "1.2rem" }}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <p className="text-center text-muted mt-3">
            Don’t have an account?{' '}
            <a href="register" className="text-primary">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
