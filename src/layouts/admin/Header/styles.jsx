import styled from 'styled-components'
import { Layout, Space, Button } from "antd";
const { Header} = Layout;

export const HeaderConteiner = styled(Header)`
  position:fixed ;
  top:0 ;
  right:0 ;
  padding:0 ;
  left:0 ;
`
export const HeaderDesktop = styled.div`
  display: block;
  width: 100%;
  z-index: 999;
  opacity: 1;
  top: 0;
  & .top-bar {
    background: #fff;
    padding: 1px 0 0px;
    box-shadow: 0 1px 2px #cecece;
    border-bottom: 1px solid #ccc;
    & .container {
      /* width: 1170px; */
      padding-right: 80px;
      padding-left: 80px;
      margin-right: auto;
      margin-left: auto;
      display:flex ;
      justify-content:space-between ;
      align-items:center ;
    }
  }
`;
export const Account = styled(Space)`
  height: 100%;
  cursor: pointer;
  & .avatar{
    border-radius:50%;
    width: 20px;
    padding-top: 100%;
    background-image:url(${(props) => props.avatar?props.avatar:null });
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`