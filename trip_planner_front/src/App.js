import "./page/common/reset.css";
import "./page/common/common.css";
import logo from "./logo.svg";
import "./App.css";
import InnList from "./page/INN/InnList";
import { Route, Routes } from "react-router-dom";
import Login from "./page/member/Login";
import Main from "./page/common/Main";
import BlogList from "./page/blog/BlogList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/innList" element={<InnList />} />
        <Route path="/blogList" element={<BlogList />} />
      </Routes>
    </div>
  );
}

export default App;
