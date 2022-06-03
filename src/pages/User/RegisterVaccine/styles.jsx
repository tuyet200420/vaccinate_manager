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
  font-size: 18px;
  text-transform: uppercase;
  color: #1d3a98;
  margin: 0;
  font-weight: 900;
`;
export const ContainerForm = styled.div`
  /* width:1000px ; */
  margin: 60px auto;
  padding: 40px 80px;
  & h2 {
    background: #1d5d98d5;
    padding: 2px 10px;
    color: white;
    text-transform: uppercase;
  }
  & label {
    font-size: 15px;
    font-weight: 800;
  }
`;
export const BgDatlich = styled.div`
  margin-top: 40px;
  font-size: 16px;
  font-family: "MyriadPro-Regular";
  color: #6d6e70;
  & .bg_title {
    background-color: #1d3a98;
    color: white;
    font-size: 22px;
    text-align: center;
    border: 2px solid white;
  }
  & .nano {
    margin: 2px;
    padding: 10px;
    background-color: #6d6e701a;
  }
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
