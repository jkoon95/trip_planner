import logo from "./logo.svg";
import "./App.css";
import InnList from "./page/INN/InnList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <InnList />

      <Routes>
        <Route path="/innList" element={<InnList />} />
      </Routes>
    </div>
  );
}

export default App;
