import { Route, Routes } from "react-router-dom";
import Login from "./page/member/Login";
import Main from "./page/common/Main";

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
