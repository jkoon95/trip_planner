import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "./promotion.css";

const PromotionList = () => {
  return (
    <section className="contents">
      <div className="input_wrap">
        <div className="input_item">
          <input id="search" className="input" placeholder="...검색어 입력" />
          <button className="btn_search" />
        </div>
      </div>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>최신순</Button>
        <Button>가격순</Button>
        <Button>마감임박</Button>
      </ButtonGroup>
    </section>
  );
};

export default PromotionList;
// *snip*
