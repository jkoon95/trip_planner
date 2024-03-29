import { useState } from "react";
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

  const [test, setTest] = useState(false);
  const blogDateAdd = () => {
    setTest(true);
  };
  return (
    <div className="blog-frm-wrap">
      <div className="blog-frm-contnet">
        <div className="blog-title-wrap">
          <label htmlFor="blog-frm-title" className="blog-frm-title">
            제목
          </label>
          <Input
            type="text"
            data={blogTitle}
            setData={setBlogTitle}
            content="blog-frm-title"
            placeholder="블로그 제목을 입력해주세요..."
          />
        </div>
      </div>
      <div className="blog-date-wrap">
        <div>DAY 1</div>
        <div>
          <div>일정생성</div>
          <button onClick={blogDateAdd}>
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>

      {test ? (
        <TextEditor
          data={blogContent}
          setData={setBlogContent}
          url={backServer + "/blog/editor"}
        />
      ) : (
        ""
      )}
      <div className="day-add-btn">
        <Button text="DAY 추가" class="btn_primary sm " />
      </div>
      <div className="btn_area">
        <Button text="등록" class="btn_secondary" clickEvent={buttonFunction} />
      </div>
    </div>
  );
};

export default BlogFrm;
