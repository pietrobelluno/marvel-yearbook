import React from "react";
import ListChars from "./pages/ListChars";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import history from "./history";
function App() {
  return (
    <Router history={history}>
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
