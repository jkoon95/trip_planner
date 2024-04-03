import { useEffect, useState } from "react";
import { Button, Input } from "../../component/FormFrm";
import TextEditor from "../../component/TextEditor";

const BlogFrm = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const blogTitle = props.blogTitle;
  const setBlogTitle = props.setBlogTitle;
  const blogDateDay = props.blogDateDay; //전체일정([ [일정1,일정2,일정3], [일정1,일정2,일정3],[일정1,일정2,일정3]])
  const setBlogDateDay = props.setBlogDateDay;
  const blogThumbnail = props.blogThumbnail;
  const setBlogThumbnail = props.setBlogThumbnail;

  const blogImg = props.blogImg;
  const setBlogImg = props.setBlogImg;

  const buttonFunction = props.buttonFunction;

  const chageThumbnail = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setBlogThumbnail(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setBlogImg(reader.result);
      };
    } else {
      setBlogThumbnail(null);
      setBlogImg(null);
    }
  };

  const dayAddBox = () => {
    setBlogDateDay([...blogDateDay, new Array()]);
  };
  return (
    <div className="blog-frm-wrap">
      <div className="blog-frm-contnet">
        <div className="blog-thumbnail">
          {blogImg === null ? (
            <img src="/images/blogDefault.png" />
          ) : (
            <img src={blogImg} />
          )}
        </div>
        <div className="blog-thumbnail-wrap">
          <label htmlFor="blogThumbnail">✅ 대표사진을 선택해주세요</label>
          <input
            type="file"
            id="blogThumbnail"
            accept="image/*"
            onChange={chageThumbnail}
          />
        </div>

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
        <div>
          {blogDateDay.map((day, index) => {
            return (
              <BlogDay
                key={"blog-day-" + index}
                index={index}
                day={day}
                blogDateDay={blogDateDay}
                setBlogDateDay={setBlogDateDay}
              />
            );
          })}
        </div>
      </div>

      <div className="date-add-btn">
        <Button
          text="DAY 추가"
          class="btn_primary sm "
          clickEvent={dayAddBox}
        />
      </div>

      <div className="btn_area">
        <Button text="등록" class="btn_secondary" clickEvent={buttonFunction} />
      </div>
    </div>
  );
};

const BlogDay = (props) => {
  const index = props.index;
  const day = props.day;

  const blogDateDay = props.blogDateDay;
  const setBlogDateDay = props.setBlogDateDay;
  const addSchedule = () => {
    blogDateDay[index] = [...day, {}];
    setBlogDateDay([...blogDateDay]);
  };
  //console.log(day);
  //console.log(blogDateDay);
  return (
    <div className="day-add-wrap">
      <div className="day-add-box">
        <div>DAY{index + 1}</div>
        <div className="day-add-btn-box">
          <div className="day-add-btn">일정생성</div>
          <button onClick={addSchedule}>
            <span className="material-icons">add</span>
          </button>
        </div>
      </div>
      <div className="day-add-btn-info">
        추가<span className="material-icons">arrow_upward</span>
      </div>

      {day.map((schedule, i) => {
        return (
          <DaySchdule
            key={"schedule-" + i}
            setBlogDateDay={setBlogDateDay}
            blogDateDay={blogDateDay}
            index={index}
            schedule={schedule}
            i={i}
            day={day}
          />
        );
      })}
    </div>
  );
};

const DaySchdule = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const i = props.i;
  const day = props.day;
  const [blogDateScheduleTitle, setBlogDateScheduleTitle] = useState("");
  const [blogDateScheduleContent, setBlogDateScheduleContent] = useState("");
  const blogDateDay = props.blogDateDay;
  const setBlogDateDay = props.setBlogDateDay;
  const index = props.index;

  useEffect(() => {
    day[i] = { blogDateScheduleTitle, blogDateScheduleContent };
    blogDateDay[index] = [...day];
    setBlogDateDay([...blogDateDay]);
  }, [blogDateScheduleTitle, blogDateScheduleContent]);

  return (
    <div className="blog-content-box">
      <div className="blog-date-day">
        <label htmlFor="blog-date-day">일정 제목</label>
      </div>
      <Input
        type="text"
        data={blogDateScheduleTitle}
        setData={setBlogDateScheduleTitle}
        placeholder="일정의 제목을 정해주세요"
        content="blog-date-day"
      />
      <TextEditor
        data={blogDateScheduleContent}
        setData={setBlogDateScheduleContent}
        url={backServer + "/blog/editor"}
      />
    </div>
  );
};
export default BlogFrm;
