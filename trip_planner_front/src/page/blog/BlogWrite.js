import { useEffect, useState } from "react";
import "./blog.css";
import BlogFrm from "./BlogFrm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BlogWrite = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDateDay, setBlogDateDay] = useState([]);
  const [blogThumbnail, setBlogThumbnail] = useState("");

  const [blogImg, setBlogImg] = useState(null);

  const navigate = useNavigate();

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
            Swal.fire("블로그가 등록되었습니다 :)");
            navigate("/blogList");
          } else {
          }
        })
        .catch((res) => {
          console.log(res);
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "입력란을 확인하세요 :)",
          });
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
