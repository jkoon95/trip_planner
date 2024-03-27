import "./page/common/reset.css";
import "./page/common/common.css";
import InnList from "./page/INN/InnList";
import { Route, Routes } from "react-router-dom";
import Login from "./page/member/Login";
import Main from "./page/common/Main";
import BlogList from "./page/blog/BlogList";
import Ref from "./Ref";
import BlogWrite from "./page/blog/BlogWrite";

function App() {
  return (
    <div className="wrap">
      <main className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/innList" element={<InnList />} />
          <Route path="/blogList" element={<BlogList />} />
          <Route path="/ref" element={<Ref />} />
          <Route path="/blogWrite" element={<BlogWrite />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
