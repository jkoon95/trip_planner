import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../component/FormFrm";

const Header = (props) => {
  const isLogin = props.isLogin;
  const logout = props.logout;
  const [searchData, setSearchData] = useState("");
  const menuRef = useRef();
  const searchRef = useRef();
  const searchInputRef = useRef();
  const menuOpen = (e) => {
    e.stopPropagation();
    menuRef.current.classList.toggle("active");
  };
  const menuClose = () => {
    menuRef.current.classList.remove("active");
  };
  const searchOpen = () => {
    searchRef.current.classList.add("active");
  };
  const searchClose = () => {
    if (searchData === "") {
      searchRef.current.classList.remove("active");
    }
  };
  const searchInputClickFunc = (e) => {
    e.stopPropagation();
    searchRef.current.classList.add("focus");
  };
  const searchInputBlurFunc = (e) => {
    e.stopPropagation();
    searchRef.current.classList.remove("focus");
    if (searchData === "") {
      searchRef.current.classList.remove("active");
    }
  };
  document.body.addEventListener("click", () => {
    menuRef.current.classList.remove("active");
  });
  return (
    <header className="header">
      <div className="header_inner">
        <h1 className="logo">
          <Link to="/" onClick={menuClose}>
            Trip Planner
          </Link>
        </h1>
        <HeaderNavi
          isLogin={isLogin}
          logout={logout}
          searchData={searchData}
          setSearchData={setSearchData}
          menuRef={menuRef}
          searchRef={searchRef}
          searchInputRef={searchInputRef}
          menuOpenFunc={menuOpen}
          searchOpenFunc={searchOpen}
          searchCloseFunc={searchClose}
          searchInputClickFunc={searchInputClickFunc}
          searchInputBlurFunc={searchInputBlurFunc}
        />
      </div>
    </header>
  );
};

const HeaderNavi = (props) => {
  const isLogin = props.isLogin;
  const logout = props.logout;
  const searchData = props.searchData;
  const setSearchData = props.setSearchData;
  const menuRef = props.menuRef;
  const searchRef = props.searchRef;
  const menuOpen = props.menuOpenFunc;
  const searchOpen = props.searchOpenFunc;
  const searchClose = props.searchCloseFunc;
  const searchInputRef = props.searchInputRef;
  const searchInputClick = props.searchInputClickFunc;
  const searchInputBlur = props.searchInputBlurFunc;
  return (
    <div className="header_navi">
      <div
        className="search_wrap"
        ref={searchRef}
        onMouseOver={searchOpen}
        onMouseLeave={searchClose}
      >
        <Input
          type="text"
          data={searchData}
          setData={setSearchData}
          inputRef={searchInputRef}
          clickEvent={searchInputClick}
          blurEvent={searchInputBlur}
        />
        <button className="btn_search">
          <span className="hidden">검색</span>
        </button>
      </div>
      <div className="menu_wrap">
        <button className="btn_menu" onClick={menuOpen}>
          <span className="hidden">메뉴</span>
        </button>
        <nav className="menu_list" ref={menuRef}>
          {isLogin ? (
            <ul>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link to="/innList">숙소 예약하기</Link>
              </li>
              <li>
                <Link to="/tourList">투어 예약하기</Link>
              </li>
              <li>
                <Link to="#">프로모션</Link>
              </li>
              <li>
                <Link to="/bloglist">블로그</Link>
              </li>
              <li>
                <Link to="#" onClick={logout}>
                  로그아웃
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/join">회원가입</Link>
              </li>
              <li>
                <Link to="/innList">숙소 예약하기</Link>
              </li>
              <li>
                <Link to="/tourList">투어 예약하기</Link>
              </li>
              <li>
                <Link to="/promotionList">프로모션</Link>
              </li>
              <li>
                <Link to="/blogList">블로그</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
