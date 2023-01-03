import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { api } from "../../Services/api";
import { login } from "../../Services/utils";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  function submit(e) {
    e.preventDefault();
    api
      .post("/login/", { username, password })
      .then((response) => {
        login(response.data.token);
        history.push("/profiles");
      })
      .catch((error) => console.log(error));
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
