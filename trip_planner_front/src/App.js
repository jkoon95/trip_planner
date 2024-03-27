import "./page/common/reset.css";
import "./page/common/common.css";
import InnList from "./page/INN/InnList";
import { Route, Routes } from "react-router-dom";
import Login from "./page/member/Login";
import Main from "./page/common/Main";
import BlogList from "./page/blog/BlogList";
import TourList from "./page/tour/TourList";
import Ref from "./Ref";
import Header from "./page/common/Header";
import Footer from "./page/common/Footer";
import MypageMain from "./page/mypage/MypageMain";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/innList" element={<InnList />} />
          <Route path="/blogList" element={<BlogList />} />
          <Route path="/tourList" element={<TourList />} />
          <Route path="/ref" element={<Ref />} />
          <Route path="/mypage/*" element={<MypageMain />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
