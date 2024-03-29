import { useState } from "react";
import { Link } from "react-router-dom";
import "./innReg.css";

import InnRegFrm from "./InnRegFrm";

const InnReg = () => {
  const [innType, setInnType] = useState([]);
  const [innAddr, setInnAddr] = useState("");
  const [innInfo, setInnInfo] = useState("");
  const [innCheckInTime, setInnCheckInTime] = useState("");
  const [innCheckOutTime, setInnCheckOutTime] = useState("");
  const [innIntro, setInnIntro] = useState("");
  const [innFile, setInnFile] = useState([null, null, null, null, null, null]); //최대 5개 등록

  const [innImg, setInnImg] = useState([null, null, null, null, null, null]);

  const write = () => {
    console.log("숙소 등록쓰");
  };
  return (
    <div className="inn-reg-all-wrap">
      <div className="inn-reg-title hidden">
        <h2>숙소등록페이지</h2>
      </div>
      <InnRegFrm
        innType={innType}
        setInnType={setInnType}
        innAddr={innAddr}
        setInnAddr={setInnAddr}
        innInfo={innInfo}
        setInnInfo={setInnInfo}
        innCheckInTime={innCheckInTime}
        setInnCheckInTime={setInnCheckInTime}
        innCheckOutTime={innCheckOutTime}
        setInnCheckOutTime={setInnCheckOutTime}
        innIntro={innIntro}
        setInnIntro={setInnIntro}
        innFile={innFile}
        setInnFile={setInnFile}
        innImg={innImg}
        setInnImg={setInnImg}
        buttonFunction={write}
      />
    </div>
  );
};

export default InnReg;
