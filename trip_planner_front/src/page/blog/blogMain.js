import { Route, Routes } from "react-router-dom";
import BlogList from "./BlogList";

const BlogMain = (props) => {
  const isLogin = props.isLogin;
  return (
    <Routes>
      <Route path="/blogList" element={<BlogList isLogin={isLogin} />} />
    </Routes>
  );
};

export default BlogMain;
