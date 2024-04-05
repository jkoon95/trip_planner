import { useParams } from "react-router-dom";
import { Button } from "../../component/FormFrm";

const NoticeView = (props) => {
  const params = useParams();
  const noticeNo = params.noticeNo;
  const member = props.member;
  const checkBtn = () => {
    console.log(member);
    console.log(noticeNo);
  };
  return (
    <section className="contents notice">
      <h2>공지사항 상세</h2>
      <Button text="확인" class="btn_secondary" clickEvent={checkBtn} />
    </section>
  );
};

export default NoticeView;
