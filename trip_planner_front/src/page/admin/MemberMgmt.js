import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import "./admin.css";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const MemberMgmt = ({ member, isLogin }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const memberType = member.memberType;
  const navigate = useNavigate();
  if (!isLogin) {
    Swal.fire({
      icon: "warning",
      text: "로그인 후 이용이 가능합니다.",
      confirmButtonText: "닫기",
    });
    navigate("/");
  }
  if (memberType !== 3) {
    Swal.fire({
      title: "접근거부",
      text: "관리자 페이지입니다.",
      icon: "warning",
    });
    navigate("/");
  }

  useEffect(() => {
    axios
      .get(backServer + "/admin/memberList/" + reqPage)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setMemberList(res.data.data.memberList);
          setPageInfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage, member]);
  return (
    <section className="contents memberMgmt">
      <h2>회원관리</h2>
      <div className="memberMgmt_wrap">
        <div className="memberMgmt-tbl-wrap">
          <table className="memberMgmt-tbl">
            <thead>
              <tr>
                <td width={"10%"}>회원번호</td>
                <td width={"20%"}>이메일</td>

                <td width={"10%"}>이름</td>
                <td width={"20%"}>닉네임</td>
                <td width={"20%"}>회원 타입</td>
                <td width={"20%"}>이용상태</td>
              </tr>
            </thead>
            <tbody>
              {memberList.map((memberItem, index) => {
                return (
                  <MemberMgmtItem
                    key={"memberItem" + index}
                    memberItem={memberItem}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="page-box">
          <Pagination
            pageInfo={pageInfo}
            reqPage={reqPage}
            setReqPage={setReqPage}
          />
        </div>
      </div>
    </section>
  );
};

const MemberMgmtItem = (props) => {
  const memberItem = props.memberItem;
  return (
    <tr>
      <td>{memberItem.memberNo}</td>
      <td className="title-td">
        <div>
          <Link to={"/mypage/admin/memberView/" + memberItem.memberNo}>
            {memberItem.memberEmail}
          </Link>
        </div>
      </td>
      <td>{memberItem.memberName}</td>
      <td>{memberItem.memberNickName}</td>
      {memberItem.memberType === 1 ? (
        <td>
          <span className="badge blue">일반회원</span>
        </td>
      ) : memberItem.memberType === 2 ? (
        <td>
          <span className="badge green">업체</span>
        </td>
      ) : (
        <td>
          <span className="badge red">관리자</span>
        </td>
      )}
      {memberItem.memberStatus === 1 ? (
        <td>
          <span className="badge blue">이용중</span>
        </td>
      ) : (
        <td>
          <span className="badge red">이용정지</span>
        </td>
      )}
    </tr>
  );
};

export default MemberMgmt;
