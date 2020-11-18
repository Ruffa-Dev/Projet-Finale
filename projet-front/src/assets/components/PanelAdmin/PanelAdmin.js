import "./paneladmin.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BiListUl } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { HiOutlineClipboardList } from "react-icons/hi";
import { CgUserList } from "react-icons/cg";
import { RiListSettingsFill } from "react-icons/ri";

function PanelAdmin() {
  const [showListing, setShowListing] = useState(false);

  /* Displaying the different accessible lists */
  const displayListing = () => {
    if (showListing) {
      return (
        <ul>
          <li>
            <Link to="/liste-admins">
              <RiListSettingsFill className="icon-panel" /> Admins
            </Link>
          </li>
          <li>
            <Link to="/liste-commercials">
              <CgUserList className="icon-panel" /> Commerciaux
            </Link>
          </li>
          <li>
            <Link to="/liste-clients-boutiques">
              <HiOutlineClipboardList className="icon-panel" /> Clients &
              Boutiques
            </Link>
          </li>
          <li>
            <Link to="/liste-par-commercial">
              <HiOutlineClipboardList className="icon-panel" /> Vue par
              Commercial
            </Link>
          </li>
        </ul>
      );
    }
  };

  return (
    /* Displaying the Dashboard */
    <div id="col" className="panel-menu">
      <ul>
        <li>
          <h4>Dashboard</h4>
        </li>
        <li>
          <li>
            <Link onClick={() => setShowListing(!showListing)}>
              <BiListUl className="icon-panel" />
              Listes
            </Link>
            {displayListing()}
          </li>
        </li>
        <li>
          <Link to="/admins">
            <RiAdminLine className="icon-panel" /> Admin
          </Link>
        </li>
        <li>
          <Link to="/commercial">
            <RiAccountPinCircleLine className="icon-panel" /> Commercial
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default PanelAdmin;
