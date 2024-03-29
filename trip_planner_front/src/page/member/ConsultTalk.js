import { useEffect } from "react";

const ConsultTalk = () => {
  useEffect(() => {
    const initKakaoScript = async () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      document.body.appendChild(script);

      script.onload = () => {
        window.Kakao.init("6d75ee1339ec3a2fa477e47c86d1c1f8");
        window.Kakao.Channel.createChatButton({
          container: "#kakao-talk-channel-chat-button",
          channelPublicId: "_hQdWG",
          title: "consult",
          size: "small",
          color: "yellow",
          shape: "pc",
          supportMultipleDensities: true,
        });
      };

      script.onerror = (error) => {
        console.error("Error loading Kakao SDK:", error);
      };
    };

    initKakaoScript();
  }, []);

  return (
    <section className="contents consult">
      <div className="consult-wrap">
        <div className="consult-title">
          <h3>카카오톡 상담 OPEN</h3>
        </div>
        <div className="consult-item">
          <div id="kakao-talk-channel-chat-button"></div>
        </div>
      </div>
      <div className="consult-content">
        <ul>
          <li>실시간 상담 이용시간은 09시~18시입니다</li>
        </ul>
        <ul>
          <li>실시간 상담 이용시간 종료 후의 답변은 익일로 넘어갑니다</li>
        </ul>
        <ul>
          <li>주말/공휴일은 휴무입니다</li>
        </ul>
      </div>
    </section>
  );
};

export default ConsultTalk;
