import { useState } from "react";
import "./blog.css";
import BlogFrm from "./BlogFrm";
import axios from "axios";

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
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  return (
    <section className="contents blogFrm">
      <h2>블로그 작성하기</h2>
      <div>
        <BlogFrm
          blogTitle={blogTitle}
          setBlogTitle={setBlogTitle}
          blogContent={blogContent}
          setBlogContent={setBlogContent}
          buttonFunction={write}
          type="write"
        />
      </div>
    </section>
  );
};

export default BlogWrite;
