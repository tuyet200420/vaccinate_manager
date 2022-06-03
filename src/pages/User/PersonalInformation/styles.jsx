import styled from "styled-components";
import { Table, Button, List, Space } from "antd";

export const Banner = styled.div`
  background: url(${(props) => props.img});
  padding: 80px 40px;
  background-repeat: no-repeat;
  text-align: center;
  background-size: 100%;
  & h1 {
    color: white;
  }
`;
export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color: #1d3a98;
  margin: 0;
  font-weight: 900;
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
    background-color: #096dd9 !important;
    color: white !important;
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
export const Container = styled.div`
  display: flex;
  padding:80px ;
  & .form-box{
    margin-left:20px ;
    width:100% ;
  }
`;
export const CustomSpaceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px !important;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
