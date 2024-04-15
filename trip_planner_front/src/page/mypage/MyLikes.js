import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyLikes = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [likeInnsList, setLikeInnsList] = useState([]);
  const [likeTourList, setLikeTourList] = useState([]);
  const [likePromotionList, setLikePromotionList] = useState([]);
  const [tabs, setTabs] = useState([
    { tabName: "숙소", active: true },
    { tabName: "투어", active: false },
    { tabName: "프로모션", active: false },
  ]);
  const tabClickFunc = (index) => {
    tabs.forEach((item) => {
      item.active = false;
    });
    tabs[index].active = true;
    setTabs([...tabs]);
  };

  return (
    <div className="myBooks_wrap">
      <h3 className="hidden">찜 리스트</h3>
      <div className="myBooks_tab">
        <div className="tab_btns">
          {tabs.map((tab, index) => {
            return (
              <button
                key={"tab" + index}
                type="button"
                className={tab.active === true ? "tab_btn active" : "tab_btn"}
                onClick={() => {
                  tabClickFunc(index);
                }}
              >
                {tab.tabName}
              </button>
            );
          })}
        </div>
        <div className="tab_contents">
          {tabs.map((tab, index) => {
            return (
              <div
                key={"tab" + index}
                className={
                  tab.active === true ? "tab_content active" : "tab_content"
                }
              >
                {tab.active === true ? (
                  tab.tabName === "숙소" ? (
                    <>
                      <h4 className="hidden">숙소 찜 내역</h4>
                      <ul className="myBook_list"></ul>
                    </>
                  ) : tab.tabName === "투어" ? (
                    <>
                      <h4 className="hidden">투어 찜 내역</h4>
                      <ul className="myBook_list"></ul>
                    </>
                  ) : (
                    <>
                      <h4 className="hidden">프로모션 찜 내역</h4>
                      <ul className="myBook_list"></ul>
                    </>
                  )
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyLikes;
