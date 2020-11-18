import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./assets/components/Footer/Footer";
import Header from "./assets/components/Header/Header";
import Login from "./assets/components/Login/Login";
import PanelAdmin from "./assets/components/PanelAdmin/PanelAdmin";
import Admins from "./assets/components/PanelAdmin/Listing/Admins";
import Commercials from "./assets/components/PanelAdmin/Listing/Commercials";
import ListeAdmins from "./assets/components/PanelAdmin/Listing/Liste-admins";
import ListeCommercials from "./assets/components/PanelAdmin/Listing/Liste-commercials";
import ClientsBoutiques from "./assets/components/PanelAdmin/Listing/Liste-clients-boutiques";
import ClientsBoutiquesCommercial from "./assets/components/PanelAdmin/Listing/Liste-par-commercial";
import "bootstrap/dist/css/bootstrap.min.css";

export const AppContext = React.createContext({});

function App() {
  const [adminToken, setAdminToken] = useState("");

  const contextContent = {
    adminToken,
    setAdminToken,
  };

  useEffect(() => {
    getToken();
  }, []);

  function getToken() {
    const token = localStorage.getItem("token");

    if (token) {
      setAdminToken(token);
    }
  }

  function renderRoutes() {
    if (adminToken) {
      return [
        <Route path="/liste-admins" component={ListeAdmins} exact />,
        <Route path="/liste-commercials" component={ListeCommercials} exact />,
        <Route
          path="/liste-clients-boutiques"
          component={ClientsBoutiques}
          exact
        />,
        <Route
          path="/liste-par-commercial"
          component={ClientsBoutiquesCommercial}
          exact
        />,
        <Route path="/admins" component={Admins} exact />,
        <Route path="/commercial" component={Commercials} exact />,
        <Route path="/" component={Login} exact />,
      ];
    } else {
      return <Route path="/" component={Login} />;
    }
  }

  return (
    <AppContext.Provider value={contextContent}>
      <Router>
        <Header />
        <div className="main-content">
          <PanelAdmin />
          <Switch>{renderRoutes()}</Switch>
        </div>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
