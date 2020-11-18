import "./liste-par-commercial.css";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { TiArrowSortedDown } from "react-icons/ti";

function ClientsBoutiquesCommercial() {
  const [list, setList] = useState({});
  const [listGlobal, setListGlobal] = useState([
    {
      shop: {},
    },
  ]);

  const [commercial, setCommercial] = useState([]);
  const [commercialId, setCommercialId] = useState("");

  useEffect(() => {
    getList();
    getCommercials();
  }, []);

  /* Retrieving Commercials' list */

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
  console.log(commercialId);
  /* Retrieving short list of customers per commercial (list entered by each commercial on the mobile app) */
  function getList() {
    const listClient = {
      ...list,
      k: "csk_a0b3c961d37ca460f8672c12ea22aff8ebe",
      id_commercial: commercialId,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(listClient),
    };

    fetch("https://cityshops.fr/api/v1/listusers", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          setListGlobal(data.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const showList = listGlobal.map((value, index) => (
    <tr key={index}>
      <td>{value.id}</td>
      <td>{value.nom}</td>
      <td>{value.prenom}</td>
      <td>{value.email}</td>
      <td>{value.societe}</td>
      <td>{value.tel}</td>
      <td>{value.shop ? value.shop.name : "-"}</td>
      <td>{value.shop ? value.shop.ville : "-"}</td>
    </tr>
  ));

  function handleSelector(e) {
    setCommercialId(e.target.value);
  }

  const showCommercialId = commercial.map((value, index) => (
    <option key={index} value={value._id}>
      {value.lastname} {value.firstname}
    </option>
  ));

  function sort(property) {
    let sortedList = Object.create(listGlobal);
    sortedList = sortedList.sort((a, b) => {
      if (a.hasOwnProperty(property) && b.hasOwnProperty(property)) {
        return a[property].localeCompare(b[property]);
      }
    });
    setListGlobal(sortedList);
  }

  return (
    <div className="content-wrapper center">
      <div className="container-fluid">
        <div className="breadcrumb">
          <p>Dashboard / Vue par Commercial</p>
        </div>
        <div>
          <select
            classname="select-style"
            name="commercial"
            onChange={handleSelector}
            defaultValue=""
          >
            <option value="" disabled>
              Choisir un commercial
            </option>
            {showCommercialId}
          </select>
          <Button id="button-par-commercial" onClick={getList}>
            Valider
          </Button>
        </div>

        {/* Displaying table of retrieved info per commercial */}
        <Table striped bordered hover>
          <thead>
            <tr className="th">
              <th>#</th>
              <th className="sorting" onClick={() => sort("nom")}>
                Nom du Client <TiArrowSortedDown />
              </th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Société</th>
              <th>Téléphone</th>
              <th>Boutique</th>
              <th>Ville</th>
            </tr>
          </thead>
          <tbody>{showList}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default ClientsBoutiquesCommercial;
