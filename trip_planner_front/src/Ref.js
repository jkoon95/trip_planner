import { useState } from "react";
import { Button, Input } from "./component/FormFrm";
import "./ref.css";

const Ref = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  return (
    <section className="contents">
      <h2>공통 모음</h2>
      <h3>페이지 기본 레이아웃</h3>
      <div className="ref_section">
        {/* .ref_section 클래스명은 쓰는거 아닙니당 여기에만 쓴거예요! */}
        <div className="layout_sample">
          header
          <div>
            .container
            <div>
              section.contents - 모든 서브페이지는 section.contents로 감싸기
              <div>h2 페이지타이틀</div>
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
        <h5>버튼 default: .btn_primary, .btn_secondary / outline</h5>
        <Button text="btn_primary" class="btn_primary"></Button>
        <Button text="btn_primary outline" class="btn_primary outline"></Button>
        <Button text="btn_secondary" class="btn_secondary"></Button>
        <Button
          text="btn_secondary outline"
          class="btn_secondary outline"
        ></Button>

        <h5>버튼 medium: .md</h5>
        <Button text="btn_primary md" class="btn_primary md"></Button>
        <Button
          text="btn_primary outline md"
          class="btn_primary outline md"
        ></Button>
        <Button text="btn_secondary md" class="btn_secondary md"></Button>
        <Button
          text="btn_secondary outline md"
          class="btn_secondary outline md"
        ></Button>

        <h5>버튼 small: .sm</h5>
        <Button text="btn_primary sm" class="btn_primary sm"></Button>
        <Button
          text="btn_primary outline sm"
          class="btn_primary outline sm"
        ></Button>
        <Button text="btn_secondary sm" class="btn_secondary sm"></Button>
        <Button
          text="btn_secondary outline sm"
          class="btn_secondary outline sm"
        ></Button>

        <h4>
          영역 안에서 버튼 사용시<span>(.btn_area로 감싸기)</span>
        </h4>
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

      <h3>인풋</h3>
      <section className="ref_section">
        <h4>기본 인풋</h4>
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="input1">기본 인풋 label</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="input1"
              data={input1}
              setData={setInput1}
            />
          </div>
          <p className="msg">
            비밀번호는 4~12자리 영문 대/소문자를 포함해서 입력해주세요.
          </p>
        </div>

        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="input2">기본 인풋 label</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="input2"
              data={input2}
              setData={setInput2}
            />
          </div>
          <p className="msg error">필수 입력항목입니다.</p>
        </div>

        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="input3">기본 인풋 label</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="input3"
              data={input3}
              setData={setInput3}
            />
          </div>
          <p className="msg success">비밀번호가 일치합니다.</p>
        </div>

        <h4>readonly</h4>
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="input4">readonly label</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="input4"
              data="인풋 readonly"
              readonly="readonly"
            />
          </div>
        </div>

        <h4>disabled</h4>
        <div className="input_wrap">
          <div className="input_title">
            <label htmlFor="input5">disabled label</label>
          </div>
          <div className="input_item">
            <Input
              type="text"
              content="input5"
              data="인풋 disabled"
              disabled="disabled"
            />
          </div>
        </div>
      </section>

      <h3>badge</h3>
      <section className="ref_section">
        <h4>색상명으로 구분(.badge.blue/.red/.green/.gray)</h4>
        <span className="badge blue">예약확정</span>
        <span className="badge red">예약취소</span>
        <span className="badge green">승인</span>
        <span className="badge gray">미승인</span>

        <h4>그룹 사용(.badges&lt;.badge)</h4>
        <div className="badges">
          <span className="badge blue">blue</span>
          <span className="badge gray">gray</span>
        </div>
      </section>
    </section>
  );
};

export default Ref;
