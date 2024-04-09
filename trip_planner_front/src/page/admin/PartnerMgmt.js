import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import "./admin.css";
import { Button } from "../../component/FormFrm";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const PartnerMgmt = ({ member, isLogin }) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [partnerList, setPartnerList] = useState([]);
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
      .get(backServer + "/admin/partnerList/" + reqPage)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setPartnerList(res.data.data.partnerList);
          setPageInfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage, member]);
  return (
    <section className="contents partnerMgmt">
      <h2>업체관리</h2>
      <div className="partnerMgmt_wrap">
        <div className="partnerMgmt-tbl-wrap">
          <table className="partnerMgmt-tbl">
            <thead>
              <tr>
                <td width={"20%"}>업체번호</td>
                <td width={"20%"}>상호명</td>
                <td width={"20%"}>업체 전화번호</td>
                <td width={"20%"}>업체 유형</td>
                <td width={"20%"}>승인여부</td>
              </tr>
            </thead>
            <tbody>
              {partnerList.map((partnerItem, index) => {
                return (
                  <PartnerMgmtItem
                    key={"partnerItem" + index}
                    partnerItem={partnerItem}
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

const PartnerMgmtItem = (props) => {
  const partnerItem = props.partnerItem;
  return (
    <tr>
      <td>{partnerItem.partnerNo}</td>
      <td className="title-td">
        <div>
          <Link to={"/mypage/admin/partnerView/" + partnerItem.partnerNo}>
            {partnerItem.partnerName}
          </Link>
        </div>
      </td>
      <td>{partnerItem.partnerTel}</td>
      <td>{partnerItem.partnerType === 1 ? "숙소" : "레저"}</td>
      {partnerItem.partnerStatus === 1 ? (
        <td>
          <span className="badge blue">승인</span>
        </td>
      ) : (
        <td>
          <span className="badge red">미승인</span>
        </td>
      )}
    </tr>
  );
};

export default PartnerMgmt;
