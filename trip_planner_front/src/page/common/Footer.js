import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_inner">
        <h1 className="logo">Trip Planner</h1>
        <nav className="menu_list">
          <ul>
            <li>
              <Link to="#">공지사항</Link>
            </li>
            <li>
              <Link to="#">이용약관</Link>
            </li>
            <li>
              <Link to="#">고객센터</Link>
            </li>
            <li>
              <Link to="#">블로그</Link>
            </li>
          </ul>
        </nav>
        <div className="footer_txt">
          <p>(주)트립플래너</p>
          <p>KH정보교육원 ｜ 사업자등록번호 : 487-86-00763 ｜ 사업자등록번호 : 851-87-00622 ｜ 서울 강남 제0000-00호 ｜ 대표자 : OOO ｜ 책임자 : OOO ｜  개인정보관리책임자 : OOO</p>
          <p>전자우편주소 : OOO@iei.or.kr | 통신판매번호 : 2024-서울강남-00000 | 관광사업자 등록번호 : 제0000-00호 | 전화번호 : 0000-0000 | 호스팅서비스제공자의 상호 표시 : (주)트립플래너</p>
          <p>(주)트립플래너는 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;