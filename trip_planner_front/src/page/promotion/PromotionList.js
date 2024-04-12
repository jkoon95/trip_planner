import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "./promotion.css";
import Pagination from "../../component/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PromotionList = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [promotionList, setPromotionList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
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

  const latest = () => {
    axios
      .get(backServer + "/promotion/promotionList/latest/" + reqPage)
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

  return (
    <section className="contents promotion">
      <div className="input_wrap">
        <div className="input_item">
          <input id="search" className="input" placeholder="...검색어 입력" />
          <button className="btn_search" />
        </div>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={latest}>최신순</Button>
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
    </section>
  );
};

const PromotionItem = (props) => {
  const promotion = props.promotion;
  return (
    <div className="promotion_item_wrap">
      <div className="promotion_content">
        <div className="promotion_title">
          <Link to={"/promotion/view/" + promotion.promotionNo}>
            <h1>{promotion.promotionName}</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromotionList;
