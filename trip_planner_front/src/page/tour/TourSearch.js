import TourSearchBox from "../../component/TourSearchBox";

const TourSearch = () => {
  return (
    <section className="contents">
      <div className="tour-list-title">
        <h2>투어 · 티켓</h2>
        <h2>검색결과</h2>
      </div>
      <TourSearchBox />
    </section>
  );
};

export default TourSearch;
