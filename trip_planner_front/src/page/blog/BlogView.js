import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogView = (props) => {
  const isLogin = props.isLogin;
  const params = useParams();
  const blogNo = params.blogNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [blog, setBlog] = useState({});
  const [member, setMember] = useState(null);
  useEffect(() => {
    axios
      .get(backServer + "/blog/one/" + blogNo)
      .then((res) => {
        console.log(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
};

export default BlogView;
