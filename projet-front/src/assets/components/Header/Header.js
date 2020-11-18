import "./header.css";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Logo from "../../img/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { AppContext } from "../../../App";
import { BiListUl } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { HiOutlineClipboardList } from "react-icons/hi";
import { CgUserList } from "react-icons/cg";
import { RiListSettingsFill } from "react-icons/ri";
import { ImCross } from "react-icons/im";

function Header() {
  const [displayNav, setDisplayNav] = useState(false);
  const history = useHistory();

  const [showListing, setShowListing] = useState(false);
  const context = useContext(AppContext);

  /* Display Listings */
  const displayListing = () => {
    if (showListing) {
      return (
        <ul>
          <li>
            <Link
              to="/liste-admins"
              onClick={() => {
                setDisplayNav(false);
              }}
            >
              <RiListSettingsFill className="icon-panel-mobile" /> Admins
            </Link>
          </li>
          <li>
            <Link
              to="/liste-commercials"
              onClick={() => {
                setDisplayNav(false);
              }}
            >
              <CgUserList className="icon-panel-mobile" /> Commerciaux
            </Link>
          </li>
          <li>
            <Link
              to="/liste-clients-boutiques"
              onClick={() => {
                setDisplayNav(false);
              }}
            >
              <HiOutlineClipboardList className="icon-panel-mobile" /> Clients &
              Boutiques
            </Link>
          </li>
          <li>
            <Link
              to="/liste-par-commercial"
              onClick={() => {
                setDisplayNav(false);
              }}
            >
              <HiOutlineClipboardList className="icon-panel-mobile" /> Vue par
              Commercial
            </Link>
          </li>
        </ul>
      );
    }
  };

  /* Display Mobile Menu */
  function showMenuMobile() {
    if (displayNav) {
      return (
        <div className="menu-mobile-global">
          <ImCross
            className="menu-cross"
            onClick={() => {
              setDisplayNav(false);
            }}
          />
          <div id="logo-container">
            <img
              id="logo-mobile"
              src={Logo}
              alt="logo"
              width="100"
              height="50"
            />
          </div>
          <div className="panel-menu-mobile">
            <Nav className="mr-auto" id="icons-menu-mobile">
              <Link className="href" to="/">
                <BiLogIn /> {/* Login Icon */}
              </Link>
              <Link className="href">
                <BiLogOut onClick={Disconnect} />
                {/* Logout Icon - Disconnecting from account */}
              </Link>
            </Nav>
            <ul>
              <li>
                <h4>Dashboard</h4>
              </li>
              <li>
                <li>
                  <Link onClick={() => setShowListing(!showListing)}>
                    <BiListUl className="icon-panel-mobile" />
                    Listes
                  </Link>
                  {displayListing()}
                </li>
              </li>
              <li>
                <Link
                  to="/admins"
                  onClick={() => {
                    setDisplayNav(false);
                  }}
                >
                  <RiAdminLine className="icon-panel-mobile" />
                  Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/commercial"
                  onClick={() => {
                    setDisplayNav(false);
                  }}
                >
                  <RiAccountPinCircleLine className="icon-panel-mobile" />
                  Commercial
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }

  /* Disconnection from admin account */
  function Disconnect() {
    let token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      context.setAdminToken("");
      history.push("/");
    }
  }

  return (
    /* Responsive Mobile menu appearing when the screen size is reduced  */
    <div className="main-header">
      <GiHamburgerMenu
        className="menu-mobile"
        onClick={() => {
          setDisplayNav(!displayNav);
        }}
      />
      {showMenuMobile()}
      <div className="main-nav">
        <img id="logo" src={Logo} alt="logo" width="100" height="50" />
        <Navbar className="nav-bar" id="main-menu">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link className="href" to="/">
                <BiLogIn /> {/* Login Icon */}
              </Link>
              <Link className="href">
                <BiLogOut onClick={Disconnect} />
                {/* Logout Icon - Disconnecting from account */}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
