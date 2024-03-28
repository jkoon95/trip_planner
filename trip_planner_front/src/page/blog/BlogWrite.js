import { useState } from "react";
import "./blog.css";
import BlogFrm from "./BlogFrm";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const BlogWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const write = () => {
    if (blogTitle !== "" && blogContent !== "") {
      const form = new FormData();
      form.append("blogTitle", blogTitle);
      form.append("blogContent", blogContent);

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
      <h2>블로그 작성하기</h2>
      <BlogFrm
        blogTitle={blogTitle}
        setBlogTitle={setBlogTitle}
        blogContent={blogContent}
        setBlogContent={setBlogContent}
        buttonFunction={write}
        type="write"
      />
    </section>
  );
};

export default BlogWrite;
