import "./liste-clients-boutiques.css";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { TiArrowSortedDown } from "react-icons/ti";

function ClientsBoutiques() {
  const [list, setList] = useState({
    k: "csk_a0b3c961d37ca460f8672c12ea22aff8ebe",
  });

  const [listGlobal, setListGlobal] = useState([
    {
      shop: {},
    },
  ]);

  useEffect(() => {
    getList();
  }, []);

  /* Retrieving global list of customers and shops  (lists entered by the commercials on the mobile app) */
  function getList() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(list),
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

  /* Displaying info according to the requested fields */
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
          <p>Dashboard / Vue globale</p>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="th">
              <th>#</th>
              <th className="sorting" onClick={() => sort("nom")}>
                Nom du Client
                <TiArrowSortedDown />
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

export default ClientsBoutiques;
