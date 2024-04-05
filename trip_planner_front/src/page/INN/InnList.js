import ListSideMenu from "./ListSideMenu";
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const InnList = () => {
  const navigate = useNavigate();
  const InnDetailView = () => {
    navigate("/innDetailView");
  };
  return (
    <section className="contents">
      <h2 className="hidden">숙소</h2>
      <div className="inn-wrap">
        <ListSideMenu />
        <div className="inn-list-wrap">ㅎㅎ</div>
        <div className="innDetailView">
          <button
            type="button"
            class="btn_primary outline"
            onClick={InnDetailView}
          >
            숙소상세
          </button>
        </div>
      </div>
    </section>
  );
};

export default InnList;
