import styled from "styled-components";
export const FooterTop = styled.div`
  border-top: 1px solid ${(props)=>props.theme.borderColor};
  background-color: white;
`
export const FooterTopContent = styled.div`
  padding: 40px 0;
  margin: 0 auto;
  max-width: 1100px;
  @media (max-width:991px) {
    padding: 15px 20px;
  }
`
export const NavigeterTitle = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  color:black;
  line-height: 17px;
  min-height: 34px;
  text-transform: uppercase;
  @media (max-width:991px) {
    font-size: 15px;
  }
`
export const AccessList = styled.ul`
  list-style-type: none;
  &>li{
    font-size: 17px;
    cursor: pointer;
    &:hover{
      opacity: .6;
    }
    @media (max-width:991px) {
    font-size: 13px;
  }
  }
`
export const FooterBottom = styled.div`
  background-color: black;
  padding: 50px 15px;
  @media (max-width:991px) {
    padding: 30px 15px;
  }
`
export const FooterBottomContent = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  font-family: "Roboto", sans-serif;
  color: #e0e0e0;;
  font-size: 13px;
  @media (max-width:991px){
    padding: 0 30px;
    font-size: 10px;
  }
`