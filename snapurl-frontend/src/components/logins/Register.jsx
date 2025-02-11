import React, { useState } from "react";
import "./Login.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form className="d-flex flex-column gap-3 w-100 p-4 bg-white rounded shadow-lg" style={{ maxWidth: "400px" }}>
        <h2 className="text-primary text-center position-relative">
          Register
          <span
            className="position-absolute rounded-circle bg-primary blink"
            style={{
              width: "16px",
              height: "16px",
              top: "40%",
              left: "-5px",
              transform: "translateY(-50%)",
            }}
          ></span>
        </h2>
        <p className="text-muted text-center">
          Signup now and get full access to our app.
        </p>
        <div className="d-flex gap-2">
          <div className="form-floating w-100">
            <input
              type="text"
              id="firstname"
              className="form-control"
              placeholder="Firstname"
              required
            />
            <label htmlFor="firstname">Firstname</label>
          </div>
          <div className="form-floating w-100">
            <input
              type="text"
              id="lastname"
              className="form-control"
              placeholder="Lastname"
              required
            />
            <label htmlFor="lastname">Lastname</label>
          </div>
        </div>
        <div className="form-floating">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating position-relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            placeholder="Password"
            required
          />
          <label htmlFor="password">Password</label>
          <span
            className="position-absolute end-0 top-50 translate-middle-y me-3"
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👀" : "🙈"}
          </span>
        </div>
        <div className="form-floating position-relative">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm password"
            required
          />
          <label htmlFor="confirmPassword">Confirm password</label>
          <span
            className="position-absolute end-0 top-50 translate-middle-y me-3"
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👀" : "🙈"}
          </span>
        </div>
        <button className="btn btn-primary w-100">Submit</button>
        <p className="text-center text-muted">
          Already have an account?{" "}
          <a href="login" className="text-primary text-decoration-none">
            Login
          </a>
        </p>
      </form>
    </div>
  
  );
};

export default Register;
