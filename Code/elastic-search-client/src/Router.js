import * as React from "react";
import { Switch, Route } from "react-router-dom";
import SearchAsYouType from "./pages/search-as-you-type";

export default function Router() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SearchAsYouType} />
      </Switch>
    </div>
  );
}
