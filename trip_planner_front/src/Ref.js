import { Button } from "./component/FormFrm";
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
        <Button text="버튼 primary" class="btn_primary"></Button>
        <Button text="버튼 primary" class="btn_primary outline"></Button>
        <Button text="버튼 secondary" class="btn_secondary"></Button>
        <Button text="버튼 secondary" class="btn_secondary outline"></Button>

        <h5>버튼 medium</h5>
        <Button text="버튼 primary" class="btn_primary md"></Button>
        <Button text="버튼 primary" class="btn_primary outline md"></Button>
        <Button text="버튼 secondary" class="btn_secondary md"></Button>
        <Button text="버튼 secondary" class="btn_secondary outline md"></Button>

        <h5>버튼 small</h5>
        <Button text="버튼 primary" class="btn_primary sm"></Button>
        <Button text="버튼 primary" class="btn_primary outline sm"></Button>
        <Button text="버튼 secondary" class="btn_secondary sm"></Button>
        <Button text="버튼 secondary" class="btn_secondary outline sm"></Button>

        <h4>영역 안에서 버튼 사용시<span>(.btn_area로 감싸기)</span></h4>
        <div className="btn_area">
          <Button text="취소" class="btn_primary outline"></Button>
          <Button text="확인" class="btn_primary"></Button>
        </div>
        <div className="btn_area">
          <Button text="목록" class="btn_secondary"></Button>
        </div>
        <div className="btn_area">
          <Button text="수정" class="btn_primary sm"></Button>
          <Button text="삭제" class="btn_primary outline sm"></Button>
        </div>
      </section>
    </section>
  );
}

export default Ref;