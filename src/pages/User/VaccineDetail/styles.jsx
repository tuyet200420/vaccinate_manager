import styled from "styled-components";

export const Banner = styled.div`
  background: url(${props => props.img});
  padding:100px 40px ;
  text-align:center ;
  & h1{
    color: white ;
  }
`;
export const Description = styled.div`
  color:gray ;
  padding: 30px ;
  background-color:#2b398f21 ;
  margin-bottom: 30px ;
`;
export const ContainerVaccineDetail = styled.div`
  max-width: 1292.5px;
  margin:0 auto ;
  & H1{
    margin-top: 40px;
    color: #2B398F;
    margin-bottom: 20px;
    font-size: 36px;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
  }
  & .right{
    margin-left:30px ;
    margin-top: 200px ;
  }
  & .title{
    color:#0624e4;
    font-size:20px ;
  }
`;