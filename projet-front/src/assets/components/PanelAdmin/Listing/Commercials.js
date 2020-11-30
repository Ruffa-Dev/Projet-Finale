import "./admins.css";
import React, { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

function Commercials() {
  const [newAccount, setnewAccount] = useState({});
  const handleNewAccount = (e) => {
    setnewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  /* Creating commercials' accounts */
  const addAccount = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(newAccount),
    };
    fetch("http://localhost:4000/admin/create-commercial", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="content-wrapper center vh">
      <div className="container-fluid">
        <div className="breadcrumb">
          <p>Dashboard / Commercial</p>
        </div>
        <Card className="admin-card-profile" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title id="card-title-h5">
              <h5>Compte Commercial</h5>
            </Card.Title>
            <hr />
            <Card.Text className="text-container">
              <Row>
                <Col>
                  <div>
                    <label>Nom</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Nom"
                      onChange={handleNewAccount}
                      name="lastname"
                      value={newAccount.lastname}
                    />
                  </div>
                  <div>
                    <label>Prénom</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Prénom"
                      onChange={handleNewAccount}
                      name="firstname"
                      value={newAccount.firstname}
                    />
                  </div>
                </Col>
                <Col>
                  <div>
                    <label>Mot de passe</label>
                    <br />
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      onChange={handleNewAccount}
                      name="password"
                      value={newAccount.password}
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <br />
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleNewAccount}
                      name="email"
                      value={newAccount.email}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Text>
            <Button className="admin-button-create" onClick={addAccount}>
              <p>Créer</p>
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Commercials;
