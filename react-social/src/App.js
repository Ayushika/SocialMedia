/** @format */

import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  return (
    <>
      <Switch>
        <Route path='/' exact component={() => <Redirect to='/products' />} />
        <Route path='/products' exact component={HomeScreen} />
      </Switch>
    </>
  );
};

export default App;
