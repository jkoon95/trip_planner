import './page/common/reset.css';
import './page/common/common.css';
import { Route, Routes } from "react-router-dom";
import Login from "./member/Login";
import Main from "./common/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;