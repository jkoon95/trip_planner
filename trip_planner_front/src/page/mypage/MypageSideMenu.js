import { Link } from "react-router-dom";

const MypageSideMenu = (props) => {
  const menus = props.menus;
  const setMenus = props.setMenus;
  const changeMenu = (index) => {
    const newMenus = menus.map((item) => {
      item.active = false;
      return item;
    });
    newMenus[index].active = true;
    setMenus(newMenus);
  }

  return(
    <div className="side_menu_wrap">
      <ul className="side_menu">
        {menus.map((menu, index) => {
          return(
            <li key={"menu" + index}>
              <Link to={menu.url} className={menu.active === true ? "active" : ""} onClick={()=>{changeMenu(index)}}>
                {menu.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MypageSideMenu;