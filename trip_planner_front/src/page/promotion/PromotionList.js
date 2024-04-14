import ButtonGroup from "@mui/material/ButtonGroup";
import "./promotion.css";
import Pagination from "../../component/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../component/FormFrm";

const PromotionList = (props) => {
  const member = props.member;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [promotionList, setPromotionList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const inputKeyword = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    axios
      .get(backServer + "/promotion/promotionList/" + reqPage)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setPromotionList(res.data.data.promotionList);
          setPageInfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);

  const search = () => {
    axios
      .get(backServer + "/promotion/promotionList/search/" + reqPage, {
        params: { keyword: keyword },
      })
      .then((res) => {
        if (res.data.message === "success") {
          setPromotionList(res.data.data.promotionList);
          setPageInfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const region = () => {
    axios
      .get(backServer + "/promotion/promotionList/region/" + reqPage)
      .then((res) => {
        if (res.data.message === "success") {
          setPromotionList(res.data.data.promotionList);
          setPageInfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const price = () => {
    axios
      .get(backServer + "/promotion/promotionList/price/" + reqPage)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setPromotionList(res.data.data.promotionList);
          setPageInfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  const deadline = () => {
    axios
      .get(backServer + "/promotion/promotionList/deadline/" + reqPage)
      .then((res) => {
        if (res.data.message === "success") {
          console.log(res.data);
          setPromotionList(res.data.data.promotionList);
          setPageInfo(res.data.data.pi);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const applyPromotion = () => {
    navigate("/promotion/applyPromotion");
  };

  return (
    <section className="contents promotion">
      <div className="input_wrap">
        <div className="input_item">
          <input
            id="search"
            className="input"
            placeholder="...검색어 입력"
            value={keyword}
            onChange={inputKeyword}
          />
          <button className="btn_search" onClick={search} />
        </div>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={region}>지역순</Button>
        <Button onClick={price}>가격순</Button>
        <Button onClick={deadline}>마감순</Button>
      </ButtonGroup>
      <div className="promotion_content_wrap">
        {promotionList.map((promotion, index) => {
          return (
            <PromotionItem key={"promotion" + index} promotion={promotion} />
          );
        })}
      </div>
      <div className="page-box">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
      {member.memberType === 2 && (
        <Button
          class="btn_primary"
          text="프로모션 신청"
          clickEvent={applyPromotion}
        />
      )}
    </section>
  );
};

const PromotionItem = (props) => {
  const promotion = props.promotion;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  return (
    <div className="promotion_item_wrap">
      <div className="promotion_content">
        <div className="promotion_title">
          <Link to={"/promotion/view/" + promotion.promotionNo}>
            <h1>{promotion.promotionName}</h1>
          </Link>
        </div>
        <div className="promotion-list-img">
          <img
            src={
              backServer +
              "/promotion/promotionThumbnail/" +
              promotion.promotionImg
            }
          />
        </div>
        <div className="promotion-list-intro">
          <h1>{promotion.promotionIntro}</h1>
        </div>
        <div className="promotion-list-price">
          <h1>가격 : {promotion.promotionPrice}</h1>
        </div>
      </div>
    </div>
  );
};

export default PromotionList;

const Loading = () => {};
