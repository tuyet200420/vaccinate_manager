
import styled from 'styled-components'
import {Space} from 'antd'
export const NavbarContainer = styled.div`
  z-index: 9999;
  border-bottom:1px solid ${(props) => props.theme.borderColor};
  &.sticky{
    position:sticky;
    top:40px;
    left: 0;
    transition: all .3s;
    background-color:white;
    box-shadow: 0px 2px 30px rgb(0 0 0 / 20%);
  }
`
export const MenuItem = styled.div`
  position: relative;
  &>p{
  padding: 10px 30px;
  margin: 0;
  cursor: pointer;
  width: 100%;
  font-size: 20px;
  white-space: nowrap;
    &:hover{
      color: red;
    }
  }
  &:hover>div{
      display: block;
    }
`
export const NavbarContent = styled.div`
  margin: 0 auto;
  max-width:1200px;
` 
export const CustomSpace = styled(Space)`
  @media (max-width:991px) {
    padding: 0 25px;
    flex-direction: column;
    width: 100%;
    display: ${(props)=>props.showMenu ? 'block': 'none'};
  }
  &>div{
    width: 100%;
    text-align: center;
  }
` 
export const Menu = styled.div`
  display: none;
  margin-left: 25px;
  padding: 15px 0;
  cursor: pointer;
  @media (max-width:991px) {
    display: block;
  }
` 
export const SubMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  z-index: 99;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => props.theme.BackgroundColor};
  &>div{
    &>p{
    text-align: left;
    font-size: 18px;
    margin: 0;
    padding: 7px 15px;
    &:hover{
      color: red;
      background-color: #746d6d26 ;
    }
  }
    &:hover>div{
      display: block;
    }
  }
` 