import React from "react";
import ListChars from "./pages/ListChars";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/page/:page">
          <ListChars />
        </Route>
        <Route path="/">
          <ListChars />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
