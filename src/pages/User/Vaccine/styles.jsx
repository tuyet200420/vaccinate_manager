import styled from "styled-components";
import { Table, Button, List, Col } from "antd";

export const Banner = styled.div`
  background: url(${props => props.img});
  padding:80px 40px ;
  text-align:center ;
  & h1{
    color: white ;
  }
`;
export const Container = styled.div`
  width: 1300px;
  margin: 80px auto ;
  box-sizing:border-box ;

`;
export const ColItem = styled(Col)`
  padding:10px ;
  & .card{
    border-bottom: 1px solid #D9D5EC;
  }
`;
export const Description = styled.div`
  height:55px ;
  overflow:hidden ;
  display:-webkit-box;
  -webkit-box-orient : vertical;
  -webkit-line-clamp:2;

`;
export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color: #1d3a98;
  font-weight: 900;
  margin: 0;
`;
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`;
export const Search = styled.div`
  display: flex;
  flex: 1;
  font-weight: 900;
  width:600px ;
  margin:auto ;
`;
export const CustomTable = styled(Table)`
  & th {
    text-transform: uppercase;
    background-color: #096dd9 !important;
    color: white !important;
  }
`;
export const ListItem = styled(List.Item)`
  background-color: #feffe6;
`;
export const CustomSpace = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 500px;
  max-width: 100%;
`;
export const ShowImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`;
export const ShowColor = styled.div`
  height: 20px;
  width: 20px;
  ${(props) => {
    if (props.color) {
      return props.color == "multiColor"
        ? "background:linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);"
        : `background-color:#${props.color}`;
    }
  }};
  border: 1px solid #096dd9;
`;
export const CustomSpaceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px !important;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
