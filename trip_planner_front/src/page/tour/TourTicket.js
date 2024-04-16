import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TourTicket = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const { tourNo } = useParams();
  // 변경불가능 정보
  const [tourName, setTourName] = useState("");
  const [tourAddr, setTourAddr] = useState("");
  const [salesCount, setSalesCount] = useState("");
  const [salesPeriod, setSalesPeriod] = useState("");
  const [salesStatus, setSalesStatus] = useState("");
  // 등록할 정보
  const [ticketAdult, setTicketAdult] = useState("");
  const [ticketYouth, setTicketYouth] = useState("");
  const [ticketChild, setTicketChild] = useState("");

  useEffect(() => {
    axios
      .get(backServer + "/tour/one/" + tourNo)
      .then((res) => {
        if (res.data.message === "success") {
          const tour = res.data.data;
          setTourName(tour.tourName);
          setTourAddr(tour.tourAddr);
          setSalesCount(tour.salesCount);
          setSalesPeriod(tour.salesPeriod);
          setSalesStatus(tour.salesStatus);
        } else {
          Swal.fire({
            title: "권한이 없습니다.",
            icon: "error",
          });
          navigate("/");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    axios
      .get(backServer + "/tour/ticket/" + tourNo)
      .then((res) => {
        const ticket = res.data.data;
        setTicketAdult(ticket.ticketAdult);
        setTicketYouth(ticket.ticketYouth);
        setTicketChild(ticket.ticketChild);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  const modifyTicket = () => {
    // 빈칸일 경우 0으로 설정
    const adultPrice = ticketAdult === "" ? 0 : ticketAdult;
    const youthPrice = ticketYouth === "" ? 0 : ticketYouth;
    const childPrice = ticketChild === "" ? 0 : ticketChild;

    const form = new FormData();
    form.append("tourNo", tourNo);
    form.append("ticketAdult", adultPrice);
    form.append("ticketYouth", youthPrice);
    form.append("ticketChild", childPrice);

    axios
      .patch(backServer + "/tour/ticket", form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
        },
      })
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire("정상적으로 등록되었습니다.");
          navigate("/mypage/tour/sale");
        } else {
          Swal.fire("등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <section className="contents">
      <div className="tour-reg-wrap">
        <div className="tour-reg-title">
          <h2>투어 이용권 관리</h2>
        </div>
        <div className="tour-frm-wrap">
          <div className="tour-frm-top">
            <div className="tour-info">
              <table style={{ width: "90%" }} className="tour-ticket-info-tbl">
                <tbody>
                  <tr>
                    <td>투어 이름</td>
                    <td>{tourName}</td>
                  </tr>
                  <tr>
                    <td>투어 주소</td>
                    <td>{tourAddr}</td>
                  </tr>
                  {/* <tr>
                    <td>일일 판매수량</td>
                    <td>{salesCount}</td>
                  </tr> */}
                  <tr>
                    <td>판매 종료날짜</td>
                    <td>{salesPeriod}</td>
                  </tr>
                  <tr>
                    <td>판매 상태</td>
                    <td>{salesStatus === 1 ? "판매중" : "준비중"}</td>
                  </tr>
                  <tr>
                    <td>성인 티켓 가격</td>
                    <td>
                      {ticketAdult === 0 ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => setTicketAdult(e.target.value)}
                          placeholder="가격을 적어주세요"
                        />
                      ) : (
                        <input
                          type="number"
                          value={ticketAdult}
                          onChange={(e) => setTicketAdult(e.target.value)}
                          placeholder="가격을 적어주세요"
                        />
                      )}
                      원
                    </td>
                  </tr>
                  <tr>
                    <td>청소년 티켓 가격</td>
                    <td>
                      {ticketYouth === 0 ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => setTicketYouth(e.target.value)}
                          placeholder="숫자만 입력 가능"
                        />
                      ) : (
                        <input
                          type="number"
                          value={ticketYouth}
                          onChange={(e) => setTicketYouth(e.target.value)}
                          placeholder="숫자만 입력 가능"
                        />
                      )}
                      원
                    </td>
                  </tr>
                  <tr>
                    <td>소인 티켓 가격</td>
                    <td>
                      {ticketChild === 0 ? (
                        <input
                          type="text"
                          value=""
                          onChange={(e) => setTicketChild(e.target.value)}
                          placeholder="빈 칸 입력시 무료"
                        />
                      ) : (
                        <input
                          type="number"
                          value={ticketChild}
                          onChange={(e) => setTicketChild(e.target.value)}
                          placeholder="빈 칸 입력시 무료"
                        />
                      )}
                      원
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          className="btn_primary handle-ticket-btn"
          onClick={modifyTicket}
        >
          티켓 등록
        </button>
      </div>
    </section>
  );
};

export default TourTicket;
