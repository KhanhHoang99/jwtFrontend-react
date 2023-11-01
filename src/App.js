import Nav from "./components/Navigation/Nav";
import Login from "./components/Login/Login";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">Home Page</Route>
        <Route path="/About">About page</Route>
        <Route path="/contact">contact page</Route>
        <Route path="/login"><Login /></Route>
        <Route path="*">
          <p>404 not Found</p>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
