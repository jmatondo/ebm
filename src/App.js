import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Homes from "./pages/Homes";
import Notes from "./pages/Notes";

function App() {
  return (
    <>
      <Router>
        <Layouts>
          <Switch>
            <Route exact path="/">
              <Homes />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
          </Switch>
        </Layouts>
      </Router>
    </>
  );
}

export default App;
