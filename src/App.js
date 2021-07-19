import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Homes from "./pages/Homes";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
