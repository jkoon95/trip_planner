import { useState } from "react";
import "./blog.css";
import BlogFrm from "./BlogFrm";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const BlogWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [blogTitle, setBlogTitle] = useState("");
  const [blogDateDay, setBlogDateDay] = useState([]);

  const write = () => {
    if (blogTitle !== "" && blogDateDay !== "") {
      const form = new FormData();
      form.append("blogTitle", blogTitle);
      form.append("blogDateDay", blogDateDay);

      axios
        .post(backServer + "/blog", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.message === "success") {
            Navigate("/blogList");
          } else {
            Swal.fire("메롱");
          }
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  return (
    <section className="contents blogFrm">
      <h2>블로그 작성</h2>
      <BlogFrm
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        blogDateDay={blogDateDay}
        setBlogDateDay={setBlogDateDay}
        buttonFunction={write}
        type="write"
      />
    </section>
  );
};

export default BlogWrite;
