import React from "react";
// import { BrowserRouter, Routes , Route } from 'react-router-dom'
// import { BrowserRouter, Route, Switch } from "react-router";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import Game from "./Game/Game";
import Score from "./Game/Score";
export * from "react-router";
// import { Router } from "react-router";
// import history from './history';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/game" exact>
          <Game />
        </Route>
        <Route path="/score" exact>
          <Score />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
