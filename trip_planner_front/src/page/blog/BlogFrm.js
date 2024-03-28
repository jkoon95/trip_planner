
import { Button, Input } from "../../component/FormFrm";
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
      <div className="btn_area">
        <Button text="등록" class="btn_secondary" clickEvent={buttonFunction} />
      </div>
    </div>
  );
};

export default BlogFrm;
