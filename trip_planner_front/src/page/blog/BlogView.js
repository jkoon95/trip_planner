import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import "react-quill/dist/quill.snow.css";
import { Button, Input, Textarea } from "../../component/FormFrm";
import Modal from "../../component/Modal";

const BlogView = (props) => {
  const isLogin = props.isLogin;
  const params = useParams();
  const blogNo = params.blogNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [blog, setBlog] = useState({});
  const [list, setlist] = useState([]);
  const [member, setMember] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const navigate = useNavigate();
  const [commnetList, setCommentList] = useState([]);
  const [isRegistComment, setIsRegistComment] = useState(true);
  const [openComment, setOpenComment] = useState(false);
  const [updateCommnet, setUpdateCommnet] = useState("");

  const closeCommentFunc = () => {
    setOpenComment(false);
  };

  useEffect(() => {
    axios
      .get(backServer + "/blogComment/commentList/" + blogNo)
      .then((res) => {
        setCommentList(res.data.data);
        console.log(res.data);
      })
      .catch((res) => {});
  }, [isRegistComment]);

  useEffect(() => {
    axios
      .get(backServer + "/blog/one/" + blogNo)
      .then((res) => {
        setBlog(res.data.data.blog);
        setlist(res.data.data.list);
      })
      .catch((res) => {
        console.log(res);
      });
    if (isLogin) {
      axios.get(backServer + "/member").then((res) => {
        console.log(res.data.data);
        setMember(res.data.data);
      });
    }
  }, []);
  const deleteBoard = () => {
    Swal.fire({
      icon: "warning",
      text: "블로그를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancleButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(backServer + "/blog/" + blog.blogNo)
          .then((res) => {
            console.log(res.data);
            if (res.data.message === "success") {
              navigate("/blogList");
            }
          })
          .catch((res) => {
            console.log(res.data);
          });
      }
    });
  };
  const insertComment = () => {
    if (commentContent !== "") {
      const form = new FormData();
      form.append("commentContent", commentContent);
      form.append("memberNickName", member.memberNickName);
      form.append("blogNo", blog.blogNo);
      axios
        .post(backServer + "/blogComment", form)
        .then((res) => {
          setCommentContent("");
          setIsRegistComment(!isRegistComment);
          Swal.fire("댓글이 등록되었습니다 :)");
        })
        .catch((res) => {
          console.log(res.data);
        });
    }
  };
  const commentUpdate = (props) => {
    const comment = props.comment;
    if (setUpdateCommnet !== "") {
      const form = new FormData();
      form.append("commentCotnet", commentContent);
      form.append("commentNo", comment.commentNo);
      console.log(commentContent);
      console.log(comment.commentNo);
      axios
        .patch(backServer + "/blogComment", form)
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire("수정이 완료되었습니다. :)");
            setIsRegistComment(!isRegistComment);
          }
        })
        .catch((res) => {
          Swal.fire("수정할 내용을 입력해주세요. :)");
        });
    }
  };
  return (
    <>
      <section className="contents blogList">
        <div className="blog-view-wrap">
          <h2>BLOG </h2>
          {isLogin ? (
            <div className="btn-box">
              {member && member.memberNickName == blog.memberNickName ? (
                <>
                  <button
                    type="button"
                    class="btn_secondary outline md"
                    onClick={deleteBoard}
                  >
                    삭제
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          <div className="blog-view-info">
            <div>닉네임 : {blog.memberNickName}</div>
            <div>작성일자 : {blog.blogDate}</div>
          </div>
          <div className="blog-view-top">
            {blog && blog.blogThumbnail === null ? (
              <img src="/images/blogDefault.png" />
            ) : (
              <img
                src={backServer + "/blog/blogThumbnail/" + blog.blogThumbnail}
              />
            )}

            <div className="blog-view-title">{blog.blogTitle}</div>
          </div>
          <div className="blog-view-content">
            {list.map((day, index) => {
              return (
                <DayItem key={"list" + index} day={day} dayNumber={index + 1} />
              );
            })}
          </div>
          <div className="comment-content-box">
            <h3>댓글</h3>
            <div className="comment-insert-box">
              <Input
                type="text"
                data={commentContent}
                setData={setCommentContent}
                placeholder="댓글을 작성해주세요"
              />
              <button
                type="button"
                class="btn_secondary md"
                onClick={insertComment}
              >
                등록
              </button>
            </div>
            {commnetList.map((comment, index) => {
              return (
                <CommentItem
                  key={"comment" + index}
                  comment={comment}
                  commentNumber={index + 1}
                  isRegistComment={isRegistComment}
                  setIsRegistComment={setIsRegistComment}
                  setOpenComment={setOpenComment}
                />
              );
            })}
          </div>
        </div>
      </section>

      <Modal
        class="modal"
        open={openComment}
        title="댓글 수정"
        useCloseBtn={true}
        closeModal={closeCommentFunc}
      >
        <Textarea
          data={updateCommnet}
          setData={setUpdateCommnet}
          placeholder="내용을 입력해주세요..."
        />

        <div className="btn_area">
          <Button
            class="btn_secondary"
            text="수정"
            clickEvent={commentUpdate}
          />
        </div>
      </Modal>
    </>
  );
};

const DayItem = (props) => {
  const day = props.day;
  const dayNumber = props.dayNumber;
  return (
    <div className="day-list">
      <div className="date-day">{"🚕 " + " day " + dayNumber + " 💨"} </div>
      <span className="schedule-title">{day.blogDateScheduleTitle}</span>
      <span
        className="schedule-content ql-editor"
        dangerouslySetInnerHTML={{ __html: day.blogDateScheduleContent }}
      ></span>
    </div>
  );
};
const CommentItem = (props) => {
  const comment = props.comment;
  const commentNumber = props.commentNumber;
  const isRegistComment = props.isRegistComment;
  const setIsRegistComment = props.setIsRegistComment;
  const setOpenComment = props.setOpenComment;
  const openCommentFunc = () => {
    setOpenComment(true);
  };
  const commentDelete = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    Swal.fire({
      icon: "warning",
      text: "댓글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancleButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(backServer + "/blogComment/" + comment.commentNo)
          .then((res) => {
            console.log(res.data);
            Swal.fire("삭제되었습니다 :)");
            setIsRegistComment(!isRegistComment);
          })
          .catch((res) => {
            console.log(res.data);
          });
      }
    });
  };
  return (
    <div className="comment-list-box">
      <div class="btn-area">
        <button
          type="button"
          class="btn_primary sm first"
          onClick={openCommentFunc}
        >
          수정
        </button>
        <button
          type="button"
          class="btn_primary outline sm"
          onClick={commentDelete}
        >
          삭제
        </button>
      </div>

      <div className="comment-number">{commentNumber}</div>
      <div className="comment-content">{comment.commentContent}</div>
      <div className="comment-info">
        <div className="comment-nickname">{comment.memberNickName} </div>
        <div className="comment-date">{comment.commentDate}</div>
      </div>
    </div>
  );
};

export default BlogView;
