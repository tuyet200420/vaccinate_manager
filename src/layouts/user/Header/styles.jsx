import styled from "styled-components";
import { Input, Space, Button } from "antd";

export const HeaderTop = styled.div`
  &.sticky {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    transition: all 0.3s;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.BackgroundColor};
  }
`;
export const HeaderDesktop = styled.div`
  display: block;
  position: relative;
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
      width: 1170px;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;
      display:flex ;
      justify-content:space-between ;
      align-items:center ;
    }
  }
`;
export const Logo = styled.img`
  cursor: pointer;
`;

export const InputSearch = styled(Input)`
  /* padding: 10px; */
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  font-size: 20px;
  outline: none;
  &:hover {
    border-color: ${(props) => props.theme.primaryColor} !important;
  }
`;
export const CustomSpace = styled(Space)`
  padding-right: 40px;
  width: 100%;
  justify-content: flex-end;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;
export const CustomButton = styled(Button)`
  font-size: 15px;
  color: ${(props) => props.theme.primaryColor};
  &:hover {
    color: ${(props) => props.theme.primaryColor};
    opacity: 0.6;
  }
  &:focus {
    color: black;
  }
`;
export const Cart = styled.div`
  padding: 0 6px;
  border-radius: 100%;
  font-size: 25px;
  color: ${(props) => props.theme.primaryColor};
  &:hover {
    color: ${(props) => props.theme.primaryColor};
    opacity: 0.6;
  }
`;
