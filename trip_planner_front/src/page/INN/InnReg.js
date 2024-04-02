import { useState } from "react";
import { Link } from "react-router-dom";
import "./innReg.css";
import Swal from "sweetalert2";
import InnRegFrm from "./InnRegFrm";
import axios from "axios";

const InnReg = (props) => {
  const member = props.member;
  const isLogin = props.isLogin;
  console.log(isLogin);
  const [innType, setInnType] = useState(0);
  const [innAddr, setInnAddr] = useState("");
  const [innInfo, setInnInfo] = useState("");
  const [innCheckInTime, setInnCheckInTime] = useState("");
  const [innCheckOutTime, setInnCheckOutTime] = useState("");
  const [innIntro, setInnIntro] = useState("");
  const [innFile, setInnFile] = useState([null, null, null, null, null, null]); //최대 6개 등록

  const [innImg, setInnImg] = useState([null, null, null, null, null, null]);

  const write = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    console.log("숙소 등록쓰");
    console.log(innType);
    console.log(innAddr);
    console.log(innInfo);
    console.log(innCheckInTime);
    console.log(innCheckOutTime);
    console.log(innIntro);
    console.log(innFile);
    if (
      innType !== 0 &&
      innAddr !== "" &&
      innInfo !== "" &&
      innCheckInTime !== "" &&
      innCheckOutTime !== "" &&
      innIntro !== "" &&
      innFile !== null
    ) {
      const form = new FormData();
      form.append("innType", innType);
      form.append("innAddr", innAddr);
      form.append("innInfo", innInfo);
      form.append("innCheckInTime", innCheckInTime);
      form.append("innCheckOutTime", innCheckOutTime);
      form.append("innIntro", innIntro);
      form.append("innInfo", innInfo);
      for (let i = 0; i < innFile.length; i++) {
        form.append("innFile", innFile[i]);
      }
      //첨부파일도 있으므로 headers에 같이 요청
      axios
        .post(backServer + "/inn/innReg", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
          },
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire("숙소 등록 완료");
        })
        .catch((res) => {
          console.log(res);
        });
    }
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
