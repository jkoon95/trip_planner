import { useState } from "react";
import "./blog.css";
import BlogFrm from "./BlogFrm";

const BlogWrite = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const write = () => {
    if (blogTitle !== "" && blogContent !== "") {
      const form = new FormData();
      form.append("blogTitle", blogTitle);
      form.append("blogContent", blogContent);
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
