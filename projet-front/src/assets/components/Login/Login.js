import "./login.css";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { AppContext } from "../../../App";

function Login() {
  const [account, setAccount] = useState({});
  const history = useHistory();

  const context = useContext(AppContext);

  const handleAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  /* Logging page */
  const loggingIn = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    };
    fetch("http://localhost:4000/admin/login", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          console.log(data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            context.setAdminToken("token");
            history.push("/liste-admins");
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    // Card for logging in as admin
    <div className="main-container center" id="login-center">
      <Card className="main">
        <h1>Connexion Admin</h1>

        <Card.Body>
          <Card.Text>
            <div id="input-container">
              <input
                className="input-e"
                type="email"
                id="email"
                placeholder=" Email"
                onChange={handleAccount}
                name="email"
                value={account.email}
              />
            </div>
            <div id="input-container">
              <input
                className="input-pw"
                type="password"
                id="password"
                placeholder=" Mot de passe"
                onChange={handleAccount}
                name="password"
                value={account.password}
              />
            </div>
          </Card.Text>
          <Button className="login-button" onClick={loggingIn}>
            Connexion
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
