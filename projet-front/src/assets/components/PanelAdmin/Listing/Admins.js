import "./admins.css";
import React, { useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

function Admins() {
  const [newAccount, setnewAccount] = useState({});
  const [editAdminList, setEditAdminList] = useState({});

  const handleNewAccount = (e) => {
    setnewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

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
    fetch("http://localhost:4000/admin/create-admin", options)
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

  /* Retrieving values' of input for admins  */
  const handleAdmin = (e) => {
    setEditAdminList({ ...editAdminList, [e.target.name]: e.target.value });
  };

  /* Modifying and updating admin info */
  const putEditAdmin = (e) => {
    e.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(editAdminList),
    };

    fetch("http://localhost:4000/admin/edit", options)
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
    <div class="content-wrapper center">
      <div class="container-fluid">
        <div class="breadcrumb">
          <p>Dashboard / Admin</p>
        </div>
        {/* Creating an admin account */}
        <Card className="admin-card-profile" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title id="card-title-h5">
              <h5>Compte Admin</h5>
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
        <Row>
          <Col>
            {/* Modifying an admin account */}
            <Card className="admin-card-edit" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title id="card-title-h5">
                  <h5>Détails du compte</h5>
                </Card.Title>
                <hr />
                <Card.Text className="text-container-edit">
                  <div>
                    <label>Nom</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Nom"
                      onChange={handleAdmin}
                      name="lastname"
                      value={editAdminList.lastname}
                    />
                  </div>

                  <div>
                    <label>Prénom</label>
                    <br />
                    <input
                      type="text"
                      placeholder="Prénom"
                      onChange={handleAdmin}
                      name="firstname"
                      value={editAdminList.firstname}
                    />
                  </div>
                </Card.Text>
                <Button
                  className="admin-button-create-edit"
                  onClick={putEditAdmin}
                >
                  <p>Modifier</p>
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {/* Modifying an admin account */}
            <Card className="admin-card-edit" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title id="card-title-h5">
                  <h5>Paramètres de sécurité</h5>
                </Card.Title>
                <hr />
                <Card.Text className="text-container-edit">
                  <div>
                    <label>Mot de passe</label>
                    <br />
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      onChange={handleAdmin}
                      name="password"
                      value={editAdminList.password}
                    />
                  </div>
                  <div>
                    <label>Email</label>
                    <br />
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={handleAdmin}
                      name="email"
                      value={editAdminList.email}
                    />
                  </div>
                </Card.Text>
                <Button
                  className="admin-button-create-edit"
                  onClick={putEditAdmin}
                >
                  <p>Modifier</p>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Admins;
