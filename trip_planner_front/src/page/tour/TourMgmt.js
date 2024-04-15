import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import Swal from "sweetalert2";

const TourMgmgt = ({ member }) => {
  const memberNo = member.memberNo;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [tourBook, setTourBook] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("product");

  useEffect(() => {
    // console.log("회원번호 : " + memberNo);
    if (!member) {
      navigate("/");
      return;
    }

    axios
      .get(backServer + "/tour/mgmt/" + reqPage + "/" + memberNo)
      .then((res) => {
        setTourBook(res.data.data.tourBook);
        setPageInfo(res.data.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [memberNo, reqPage]);

  const handleMemberClick = (memberPhone, memberEmail) => {
    Swal.fire({
      title: "회원 정보",
      html: `<p>전화번호: ${memberPhone}</p><p>이메일: ${memberEmail}</p>`,
      confirmButtonText: "확인",
    });
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };
  const handleSearch = () => {
    if (searchText !== "") {
      if (searchType === "product") {
        axios
          .get(
            backServer +
              "/tour/mgmtSearch1/" +
              reqPage +
              "/" +
              searchText +
              "/" +
              memberNo
          )
          .then((res) => {
            setTourBook(res.data.data.tourBook);
            setPageInfo(res.data.data.pi);
          })
          .catch((res) => {
            console.log(res);
          });
      } else if (searchType === "member") {
        axios
          .get(
            backServer +
              "/tour/mgmtSearch2/" +
              reqPage +
              "/" +
              searchText +
              "/" +
              memberNo
          )
          .then((res) => {
            setTourBook(res.data.data.tourBook);
            setPageInfo(res.data.data.pi);
          })
          .catch((res) => {
            console.log(res);
          });
      }
    } else {
      Swal.fire("검색어를 입력해주세요.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="contents">
      <div className="tour-reg-wrap">
        <div className="tour-reg-title">
          <h2>투어 예약 관리</h2>
        </div>
        <div className="tour-mgmt-search-box">
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="product">상품명</option>
            <option value="member">예약자</option>
          </select>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <div className="tour-book-table">
          <div className="tour-book-row">
            <div className="tour-book-col">번호</div>
            <div className="tour-book-col">상품명</div>
            <div className="tour-book-col">예약자</div>
            <div className="tour-book-col">예약 일자</div>
            <div className="tour-book-col">구매 수량</div>
            <div className="tour-book-col">총 가격</div>
            <div className="tour-book-col">예약 상태</div>
          </div>
          {tourBook.map((tour, index) => (
            <div key={"tour" + index} tour={tour} className="tour-book-row">
              <div className="tour-book-col">{tour.tourBookNo}</div>
              <div className="tour-book-col">{tour.tourName}</div>
              <div
                className="tour-book-col bookMemberName"
                onClick={() =>
                  handleMemberClick(tour.memberPhone, tour.memberEmail)
                }
              >
                {tour.memberName}
              </div>
              <div className="tour-book-col">{tour.bookDate}</div>
              <div className="tour-book-col">{tour.bookGuest}</div>
              <div className="tour-book-col">
                {tour.bookFee.toLocaleString("ko-KR")}원
              </div>
              <div className="tour-book-col">
                {tour.bookStatus === 1 ? "확정" : "취소"}
              </div>
            </div>
          ))}
        </div>
        <div className="tour-page">
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

export default TourMgmgt;
