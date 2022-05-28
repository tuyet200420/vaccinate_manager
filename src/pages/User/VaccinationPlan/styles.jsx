import styled from "styled-components";
import { Table, Button, List, Space } from "antd";

export const Banner = styled.div`
  background: url(${props => props.img});
  padding:80px 40px ;
  text-align:center ;
  & h1{
    color: white ;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color: #1d3a98;
  margin: 0;
  font-weight: 900;
`;
export const ContainerTable = styled.div`
  /* width:1000px ; */
  margin:80px auto ;
  padding:80px ;
  background-color:#2b398f21 ;
`;
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`;
export const Search = styled.div`
  display: flex;
  flex: 1;
  font-weight: 900;
`;
export const CustomTable = styled(Table)`
  & th {
    text-transform: uppercase;
    white-space: nowrap;
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
export const CustomSpaceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px !important;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
