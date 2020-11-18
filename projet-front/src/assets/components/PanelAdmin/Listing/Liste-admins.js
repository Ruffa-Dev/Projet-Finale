import "./liste-admins.css";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { FiEdit } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { TiArrowSortedDown } from "react-icons/ti";

function ListeAdmins() {
  const [admin, setAdmin] = useState([]);
  const [editAdminList, setEditAdminList] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAdmins();
  }, []);

  /* Retrieving list of admins */
  function getAdmins() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    fetch("http://localhost:4000/admin/view-admins", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setAdmin(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /* Display admins' details  */
  const showAdmins = () =>
    admin.map((value, index) => {
      return (
        <tr key={index}>
          <td className="hide-column">{value._id}</td>
          <td>{value.lastname}</td>
          <td>{value.firstname}</td>
          <td>{value.email}</td>
          <td>
            <BootstrapSwitchButton
              checked={value.activated}
              size="sm"
              disabled
            />
          </td>
          <td>
            <FiEdit
              className="icon-edit"
              onClick={() => editAdmin(value._id)}
            />
          </td>
        </tr>
      );
    });

  const editAdmin = (id) => {
    const searchedAdmin = admin.find((element) => element._id === id);
    if (searchedAdmin) {
      setEditAdminList(searchedAdmin);
      handleShow();
    }
  };

  /* Retrieving values' of input for admins  */
  const handleAdmin = (e) => {
    setEditAdminList({ ...editAdminList, [e.target.name]: e.target.value });
  };

  /* Retrieving value of the Switch button */
  const handleAdminActivated = () => {
    setEditAdminList({ ...editAdminList, activated: !editAdminList.activated });
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

    fetch("http://localhost:4000/admin/edit-admins-list", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getAdmins();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /* Sorting table by Lastname and Firstname of admin  */
  function sort(property) {
    let sortedAdmin = Object.create(admin);
    sortedAdmin = sortedAdmin.sort((a, b) => {
      return a[property].localeCompare(b[property]);
    });
    setAdmin(sortedAdmin);
  }

  return (
    <div className="content-wrapper center">
      <div className="container-fluid">
        <div className="breadcrumb">
          <p>Dashboard / Liste des Admins</p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="th">
              <th className="hide-column">#</th>
              <th className="sorting" onClick={() => sort("lastname")}>
                Nom <TiArrowSortedDown />
              </th>
              <th className="sorting" onClick={() => sort("firstname")}>
                Prénom <TiArrowSortedDown />
              </th>
              <th>Email</th>
              <th>Actif</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>{showAdmins()}</tbody>
        </Table>
      </div>
      {/* Modifications are made through a Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* Displaying Lastname and Firstname of the account to modify */}
          <Modal.Title>
            Modifier : " {editAdminList.lastname} {editAdminList.firstname} "
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-container-modal">
          <div>
            <label>Nom :</label>
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
            <label>Prénom :</label>
            <br />
            <input
              type="text"
              placeholder="Prénom"
              onChange={handleAdmin}
              name="firstname"
              value={editAdminList.firstname}
            />
          </div>
          <div>
            <label>Mot de passe :</label>
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
            <label>Email :</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              onChange={handleAdmin}
              name="email"
              value={editAdminList.email}
            />
          </div>
          <BootstrapSwitchButton
            checked={editAdminList.activated}
            size="sm"
            onChange={handleAdminActivated}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button-modal"
            variant="primary"
            onClick={putEditAdmin}
          >
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListeAdmins;
