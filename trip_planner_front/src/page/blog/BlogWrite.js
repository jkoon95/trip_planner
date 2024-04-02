import { useEffect, useState } from "react";
import "./blog.css";
import BlogFrm from "./BlogFrm";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BlogWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDateDay, setBlogDateDay] = useState([]);
  const [blogThumbnail, setBlogThumbnail] = useState("");

  const [blogImg, setBlogImg] = useState(null);

  useEffect(() => {
    axios
      .get(backServer + "/member")
      .then((res) => {
        console.log(res.data.data);
        setMember(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const write = () => {
    if (blogTitle !== "" && blogDateDay !== "") {
      const form = new FormData();
      form.append("blogTitle", blogTitle);
      form.append("blogDateDay", JSON.stringify(blogDateDay));
      form.append("memberNickName", member.memberNickName);
      form.append("thumbnail", blogThumbnail);
      console.log(blogTitle);
      console.log(blogDateDay);
      console.log(blogThumbnail);
      console.log(member.memberNickName);

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
        BlogThumbnail={blogThumbnail}
        setBlogThumbnail={setBlogThumbnail}
        blogImg={blogImg}
        setBlogImg={setBlogImg}
        buttonFunction={write}
      />
    </section>
  );
};

export default BlogWrite;
