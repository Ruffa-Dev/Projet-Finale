import "./liste-commercials.css";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { FiEdit } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { TiArrowSortedDown } from "react-icons/ti";

function ListeCommercials() {
  const [commercial, setCommercial] = useState([]);
  const [editCommercialList, setEditCommercialList] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getCommercials();
  }, []);

  /* Viewing commercials' list (info retrieved from back/data base) */
  function getCommercials() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    };

    fetch("http://localhost:4000/admin/view-commercials", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setCommercial(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /* Displaying the requested fields per commercial */
  const showCommercials = () =>
    commercial.map((value, index) => (
      <tr key={index}>
        <td className="hide-column">{value._id}</td>
        <td>{value.lastname}</td>
        <td>{value.firstname}</td>
        <td>{value.email}</td>
        <td>
          <BootstrapSwitchButton checked={value.activated} size="sm" disabled />
        </td>
        <td>
          <FiEdit
            className="icon-edit"
            onClick={() => editCommercial(value._id)}
          />
        </td>
      </tr>
    ));

  const editCommercial = (id) => {
    const searchedCommercial = commercial.find((element) => element._id === id);
    if (searchedCommercial) {
      setEditCommercialList(searchedCommercial);
      handleShow();
    }
  };

  const handleCommercial = (e) => {
    setEditCommercialList({
      ...editCommercialList,
      [e.target.name]: e.target.value,
    });
  };

  const handleCommercialActivated = () => {
    setEditCommercialList({
      ...editCommercialList,
      activated: !editCommercialList.activated,
    });
  };

  /* Modifying and updating commercials on database */
  const putEditCommercial = (e) => {
    e.preventDefault();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(editCommercialList),
    };

    fetch("http://localhost:4000/admin/edit-commercials-list", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          alert(data.message);
          getCommercials();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  /* Sorting table by Lastname and Firstname of commercial  */
  function sort(property) {
    let sortedCommercial = Object.create(commercial);
    sortedCommercial = sortedCommercial.sort((a, b) => {
      return a[property].localeCompare(b[property]);
    });
    setCommercial(sortedCommercial);
  }

  return (
    <div className="content-wrapper center">
      <div className="container-fluid">
        <div className="breadcrumb">
          <p>Dashboard / Liste des Commerciaux</p>
        </div>
        {/* Table showing all commercials' accounts created by admins */}
        <Table striped bordered hover>
          <thead>
            <tr className="th">
              <th className="hide-column">#</th>
              <th className="sorting" onClick={() => sort("lastname")}>
                {/* Sorting by Lastname*/}
                Nom <TiArrowSortedDown />
              </th>
              <th className="sorting" onClick={() => sort("firstname")}>
                {/* Sorting by Firstname*/}
                Prénom <TiArrowSortedDown />
              </th>
              <th>Email</th>
              <th>Actif</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>{showCommercials()}</tbody>
        </Table>
      </div>

      {/* Modal created to modify the commercials' entries */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Modifier : " {editCommercialList.lastname}
            {editCommercialList.firstname} "
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-container-modal">
          <div>
            <label>Nom :</label>
            <br />
            <input
              type="text"
              placeholder="Nom"
              onChange={handleCommercial}
              name="lastname"
              value={editCommercialList.lastname}
            />
          </div>
          <div>
            <label>Prénom :</label>
            <br />
            <input
              type="text"
              placeholder="Prénom"
              onChange={handleCommercial}
              name="firstname"
              value={editCommercialList.firstname}
            />
          </div>
          <div>
            <label>Mot de passe :</label>
            <br />
            <input
              type="password"
              placeholder="Mot de passe"
              onChange={handleCommercial}
              name="password"
              value={editCommercialList.password}
            />
          </div>
          <div>
            <label>Email :</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              onChange={handleCommercial}
              name="email"
              value={editCommercialList.email}
            />
          </div>
          {/* Switch button to activate or deactivate a commercial account */}
          <BootstrapSwitchButton
            checked={editCommercialList.activated}
            size="sm"
            onChange={handleCommercialActivated}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="button-modal"
            variant="primary"
            onClick={putEditCommercial}
          >
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListeCommercials;
