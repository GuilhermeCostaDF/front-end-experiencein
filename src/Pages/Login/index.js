import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { api } from "../../Services/api";
import { login } from "../../Services/utils";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();

  function submit(e) {
    e.preventDefault();
    api
      .post("/login/", { username, password })
      .then((response) => {
        login(response.data.token);
        history.push("/profiles");
      })
      .catch((error) => {
        setErrorMessage("There's an error. Try Again!");
        console.error(error);
      });
  }

  return (
    <div className="big-container">
      <div className="left-container"></div>
      <div className="right-container">
        <div className="form">
          <h1>ExperienceIN</h1>
          <form>
            <label>
              Username
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="error">{errorMessage}</div>
            <button type="submit" onClick={submit}>
              Login
            </button>
            <div className="link">
              <p>
                <span>New user?</span>
                <NavLink exact to="/register">
                  Register
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
