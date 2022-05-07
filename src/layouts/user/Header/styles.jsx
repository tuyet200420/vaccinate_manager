import styled from 'styled-components'
import { Input, Space, Button } from 'antd';

export const HeaderTop = styled.div`
  &.sticky{
    z-index: 9999;
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    transition: all .3s;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.BackgroundColor};
  }
`
export const HeaderContainer = styled.div`
  padding: 10px 30px;
  margin: 0 auto;
  max-width: 1200px;
  background-color: ${(props) => props.theme.BackgroundColor};

`
export const Logo = styled.img`
  cursor: pointer;
`

export const InputSearch = styled(Input)`
  /* padding: 10px; */
  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.primaryColor};
  font-size: 20px;
  outline: none;
  &:hover{
    border-color: ${(props) => props.theme.primaryColor} !important;
  }
`
export const CustomSpace = styled(Space)`
  padding-right:40px;
  width: 100%;
  justify-content: flex-end;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`
export const CustomButton = styled(Button)`
  font-size: 15px;
  color: ${(props) => props.theme.primaryColor};
  &:hover{
    color: ${(props) => props.theme.primaryColor};
    opacity: .6;
  }
  &:focus{
    color:black;
  }
`
export const Cart = styled.div`
  padding:0 6px;
  border-radius: 100%;
  font-size: 25px;
  color: ${(props) => props.theme.primaryColor};
  &:hover{
    color:${(props) => props.theme.primaryColor} ;
    opacity: .6;
  }
`
