import React, { Component } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../Services/utils";
import "./Header.css";

export function Header({ nome }) {
  const history = useHistory();

  function handleLogout() {
    logout();
    history.push("/");
  }

  return (
    <header>
      <nav>
        <h1>{nome}</h1>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#fff",
                      background: "#7600dc",
                    }
                  : {
                      color: "white",
                      background: "#292929",
                      textDecoration: "none",
                    }
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
