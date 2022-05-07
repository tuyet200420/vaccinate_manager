import styled from 'styled-components'
export const mainContainer = styled.div`
  position: relative;
  
`
export const contentContainer = styled.div`
  padding: 40px 80px;
  ${(props) =>props.isShowSiderBar && 'margin-left: 243px;'}
  transition: all .3s;
  
`
export const layoutFixedSiderLogo  = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.2);
`
export const siteLayout = styled.div`
  background: #fff;
  min-height:70vh ;
  padding:10px ;
` 