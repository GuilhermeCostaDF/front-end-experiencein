import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Header } from "../../Components/Header/Header";
import { api } from "../../Services/api";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [companyName, setCompanyName] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  function submit(e) {
    e.preventDefault();
    api
      .post("/perfis/", {
        nome: name,
        email: email,
        nome_empresa: companyName,
        senha: password,
      })
      .then((response) => {
        console.log(response);
        history.push("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Header />
      <div className="form ">
        <h1>New Account</h1>
        <form onSubmit={submit}>
          <label>
            Name
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Company Name
            <input
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button>Register</button>
        </form>
      </div>
    </>
  );
}
