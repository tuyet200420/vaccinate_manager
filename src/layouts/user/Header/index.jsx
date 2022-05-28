import { Row, Col, Menu, Dropdown, Button } from "antd";
import history from "../../../utils/history";
import { useState } from "react";
import logo from "../../../assets/images/logo3.png";
import { useSelector, useDispatch } from "react-redux";

import * as Style from "./styles";

function Header({}) {
  return (
    <>
      <Style.HeaderDesktop>
        <div className="top-bar">
          <div className="container">
            <img src={logo} width="70" />
            <Button type="primary" danger>
              Đăng nhập
            </Button>
          </div>
        </div>
        <div className="bar-content">
         
        </div>
      </Style.HeaderDesktop>
    </>
  );
}
export default Header;
