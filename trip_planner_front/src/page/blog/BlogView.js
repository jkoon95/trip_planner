import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  //const [comment, setComment] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const navigate = useNavigate();
  const [comment, setComment] = useState([]);
  const [isRegistComment, setIsRegistComment] = useState(true);

  useEffect(() => {
    window.scrollTo({top: 0});
  }, [])

  useEffect(() => {
    axios
      .get(backServer + "/blogComment/commentList/" + blogNo)
      .then((res) => {
        setComment(res.data.data);
        // console.log(res.data.data);
      })
      .catch((res) => {});
  }, [isRegistComment]);

  useEffect(() => {
    axios
      .get(backServer + "/blog/one/" + blogNo)
      .then((res) => {
        console.log(res.data.data);
        setBlog(res.data.data.blog);
        const arr = res.data.data.list;
        const array = new Array();
        for(let i=0;i<arr.length;i++){
          if(i == 0){
            const innerArray = new Array();
            innerArray.push(arr[i]);
            array.push(innerArray);
          }else{
            if(arr[i].blogDateDay === arr[i-1].blogDateDay){
              array[array.length-1].push(arr[i]);
            }else{
              const innerArray = new Array();
              innerArray.push(arr[i]);
              array.push(innerArray);
            }
          }
        }
        console.log(array);
        setlist(array);
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
  };
  const blogList = () => {
    navigate("/blogList/");
  };
  return (
    <section className="contents blogList">
      <div className="blog-view-wrap">
        <h2>BLOG </h2>
        {isLogin ? (
          <div className="btn-box">
            {member && member.memberNickName == blog.memberNickName ? (
              <>
                <button
                  type="button"
                  className="btn_secondary outline md"
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

          <div className="blog-view-title">
            <span>여행 제목 : </span>
            {blog.blogTitle}
          </div>
        </div>
        <div className="blog-view-content">
          {list.map((day, index) => {
            return <DayItem key={"list" + index} day={day} index={index} />;
          })}
        </div>
        <div className="btn-area">
          <button
            type="button"
            className="btn_secondary listBtn"
            onClick={blogList}
          >
            블로그 목록
          </button>
        </div>
        <div className="comment-content-box">
          <h3>댓글</h3>
          <>
            {isLogin ? (
              <div>
                <div className="comment-insert-box">
                  <Input
                    type="text"
                    data={commentContent}
                    setData={setCommentContent}
                    placeholder="댓글을 작성해주세요"
                  />
                  <button
                    type="button"
                    className="btn_secondary md"
                    onClick={insertComment}
                  >
                    등록
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
          {comment.map((comment, index) => {
            return (
              <CommentItem
                key={"comment" + index}
                comment={comment}
                commentNumber={index + 1}
                isRegistComment={isRegistComment}
                setIsRegistComment={setIsRegistComment}
                member={member}
                isLogin={isLogin}
                //setOpenComment={setOpenComment}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const DayItem = (props) => {
  const day = props.day;
  const index = props.index;
  console.log(day);

  return (
    <div className="day-list">
      <div className="day-titie-box">
        Day <span>{index + 1}</span>
      </div>  
      {day.map((dayDetail, i)=>{
        return (
          <div key={"detail"+i} className="day-content">
            <div className="schedule-title">
              <span>일정 제목</span> : {dayDetail.blogDateScheduleTitle}
            </div>
            <div
              className="schedule-content ql-editor"
              dangerouslySetInnerHTML={{ __html: dayDetail.blogDateScheduleContent }}
            ></div>
          </div>
        )
      })}
    </div>
  );
};
const CommentItem = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const isLogin = props.isLogin;
  const member = props.member;
  const comment = props.comment;
  const commentNumber = props.commentNumber;
  const isRegistComment = props.isRegistComment;
  const setIsRegistComment = props.setIsRegistComment;
  const [openComment, setOpenComment] = useState(false);
  const [updateComment, setUpdateComment] = useState({ ...comment });

  const changeContent = (value) => {
    updateComment.commentContent = value;
    setUpdateComment({ ...updateComment });
  };
  useEffect(() => {
    if (!openComment) {
      setUpdateComment({ ...comment });
    }
  }, [openComment, comment]);
  const openCommentFunc = () => {
    setOpenComment(true);
  };
  const closeCommentFunc = () => {
    setOpenComment(false);
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
  const commentUpdate = (props) => {
    const commentContent = props.commentContent;
    if (commentContent !== "") {
      const form = new FormData();
      form.append("commentNo", comment.commentNo);
      form.append("blogNo", comment.blogNo);
      form.append("memberNickName", comment.memberNickName);
      form.append("commentContent", updateComment.commentContent);
      axios
        .patch(backServer + "/blogComment", form)
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire("수정이 완료되었습니다. :)");
            setOpenComment(false);
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
      <Modal
        class="modal"
        open={openComment}
        title="댓글 수정"
        useCloseBtn={true}
        closeModal={closeCommentFunc}
      >
        <Textarea
          data={updateComment.commentContent}
          setData={changeContent}
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

      <div className="comment-list-box">
        <div className="comment-number">{commentNumber}</div>
        <div className="comment-contents-wrap">
          <div className="comment-info">
            <div className="comment-nickname">{comment.memberNickName} </div>
            <div className="comment-date">{comment.commentDate}</div>
          </div>
          <div className="comment-content">
            <div className="comment-inner">{comment.commentContent}</div>
          </div>
        </div>
        <>
          {isLogin &&
          member &&
          member.memberNickName === comment.memberNickName ? (
            <div className="btn-area">
              <button
                type="button"
                className="btn_primary sm first"
                onClick={openCommentFunc}
              >
                수정
              </button>
              <button
                type="button"
                className="btn_primary outline sm"
                onClick={commentDelete}
              >
                삭제
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      </div>
    </>
  );
};

export default BlogView;
