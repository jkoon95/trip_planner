import { Input } from "../../component/FormFrm";
import TextEditor from "../../component/TextEditor";

const BlogFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const blogTitle = props.blogTitle;
  const setBlogTitle = props.setBlogTitle;
  const blogContent = props.blogContent;
  const setBlogContent = props.setBlogContent;

  const buttonFunction = props.buttonFunction;

  const type = props.type;

  return (
    <section className="contents blogFrm">
      <div className="blog-frm-wrap">
        <div className="blog-frm-contnet">
          <label htmlFor="blog-frm-title" className="blog-frm-title">
            제목
          </label>
          <Input
            type="text"
            data={blogTitle}
            setData={setBlogTitle}
            content="blog-frm-title"
          />
        </div>
        <div className="blog-frm-content">
          <TextEditor
            data={blogContent}
            setData={setBlogContent}
            url={backServer + "/blog/editor"}
          />
        </div>
        <div className="blog-frm-btn">
          <button
            type="button"
            className="btn_secondary outline md blogBtn"
            onClick={buttonFunction}
          >
            등 록
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogFrm;
