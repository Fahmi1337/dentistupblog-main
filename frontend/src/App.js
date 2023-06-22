import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import TopBar from "./components/layout/TopBar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";





if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  const [updatedToken, setUpdatedToken] = useState(true)


console.log("store?", store.getState().post.posts)


  useEffect(() => {
    store.dispatch(loadUser());

  }, []);

 

  return (
    <Provider store={store}>
      <Router>
        <Fragment>

          {updatedToken && <TopBar />}
         
         
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
