import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import PromotionList from "./PromotionList";
import PromotionView from "./PromotionView";
import PromotionApply from "./PromotionApply";

const PromotionMain = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const [member, setMember] = useState("");
  const isLogin = props.isLogin;
  useEffect(() => {
    axios
      .get(backServer + "/member")
      .then((res) => {
        // console.log(res.data.data);
        setMember(res.data.data);
        console.log(member);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return (
    <Routes>
      <Route
        path="/promotionList"
        element={<PromotionList member={member} isLogin={isLogin} />}
      />
      <Route
        path="/view/:promotionNo"
        element={<PromotionView member={member} isLogin={isLogin} />}
      />
      <Route
        path="/applyPromotion"
        element={<PromotionApply member={member} isLogin={isLogin} />}
      />
    </Routes>
  );
};

export default PromotionMain;
