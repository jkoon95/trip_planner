import "./page/common/reset.css";
import "./page/common/common.css";
import { Route, Routes } from "react-router-dom";
import Login from "./member/Login";
import Main from "./common/Main";
import logo from "./logo.svg";
import "./App.css";
import InnList from "./page/INN/InnList";
import { Route, Routes } from "react-router-dom";
import Login from "./page/member/Login";
import Main from "./page/common/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <InnList />

        <Route path="/innList" element={<InnList />} />
      </Routes>
    </div>
  );
};

export default App;
