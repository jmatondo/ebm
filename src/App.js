import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Homes";
import Culte from "./pages/Culte";
import Ebm from "./pages/Ebm";
import Mic from "./pages/Mic";
import Other from "./pages/Other";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ebm" component={Ebm} />
          <Route path="/cultes" component={Culte} />
          <Route path="/mics" component={Mic} />
          <Route path="/other" component={Other} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
