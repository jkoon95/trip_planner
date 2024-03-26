import { Button1, Button2 } from "./component/FormFrm";
import "./ref.css";

const Ref = () => {
  return (
    <section className="contents">
      <h2>공통 모음</h2>
      <h3>페이지 기본 레이아웃</h3>
      <div className="ref_section">{/* .ref_section 클래스명은 쓰는거 아닙니당 여기에만 쓴거예요! */}
        <div className="layout_sample">
          header
          <div>
            .container
            <div>
              section.contents - 모든 서브페이지는 section.contents로 감싸기
              <div>
                h2 페이지타이틀
              </div>
            </div>
          </div>
          footer
        </div>
      </div>

      <h3>제목 태그</h3>
      <section className="ref_section">
        <h2>페이지 타이틀(h2)</h2>
        <h3>페이지 내 서브 타이틀(h3)</h3>
        <h4>페이지 내 아이템 타이틀(h4)</h4>
        <h5>페이지 내 아이템의 서브 타이틀(h5)</h5>
      </section>

      <h3>버튼</h3>
      <section className="ref_section">
        <h4>버튼 기본</h4>
        <h5>버튼 default</h5>
        <Button1 text="버튼 primary"></Button1>
        <Button2 text="버튼 secondary"></Button2>
        <Button1 text="버튼 primary outline" outline="outline"></Button1>
        <Button2 text="버튼 secondary outline" outline="outline"></Button2>

        <h5>버튼 medium</h5>
        <Button1 text="버튼 primary" size="md"></Button1>
        <Button2 text="버튼 secondary" size="md"></Button2>
        <Button1 text="버튼 primary outline" size="md" outline="outline"></Button1>
        <Button2 text="버튼 secondary outline" size="md" outline="outline"></Button2>

        <h5>버튼 small</h5>
        <button type="button" className="btn_primary sm">버튼 primary</button>
        <button type="button" className="btn_secondary sm">버튼 secondary</button>
        <button type="button" className="btn_primary outline sm">버튼 primary outline</button>
        <button type="button" className="btn_secondary outline sm">버튼 secondary outline</button>

        <h4>영역 안에서 버튼 사용시<span>(.btn_area로 감싸기)</span></h4>
        <div className="btn_area">
          <button type="button" className="btn_primary outline lg">취소</button>
          <button type="button" className="btn_primary lg">확인</button>
        </div>
        <div className="btn_area">
          <button type="button" className="btn_primary lg">메인으로 가기</button>
        </div>
        <div className="btn_area">
          <button type="button" className="btn_primary sm">수정</button>
          <button type="button" className="btn_primary outline sm">삭제</button>
        </div>
      </section>
    </section>
  );
}

export default Ref;