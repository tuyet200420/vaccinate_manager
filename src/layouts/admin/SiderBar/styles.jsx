import styled from 'styled-components'
export const SiderBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
  transition: all .3s;
  height: calc(100vh - 90px);
  background-color: #ff7875;
  ${(props) =>props.isShowSiderBar || 'transform: translateX(-100%);'};
  
  
`
export const menuItem = styled.p`
  color: white;
  cursor: pointer;
  font-size: 20px;
  margin: 7px 0;
`
export const menuIcon = styled.div`
  position: absolute;
  top: 12px;
  left: 100%;
  border: 1px solid ${(props) => props.theme.primaryColor};
  padding:0 5px;
  color: ${(props) => props.theme.primaryColor};
  cursor: pointer;
  font-size: 20px;
  &::after{
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    border-top: 12px solid transparent;
    border-right: 12px solid white;
    border-left: 12px solid transparent;
    border-bottom: 12px solid transparent;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    
  }
`