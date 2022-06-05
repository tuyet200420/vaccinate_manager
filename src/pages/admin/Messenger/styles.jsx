import styled from "styled-components";
import { Table, Button, List, Space } from "antd";

export const ListMsg = styled.div`
  height: calc(100vh - 200px);
  width: 100%;
  /* box-shadow: 2px 5px 5px #888888; */
  border-right:1px solid #888888;

  & .msg-item {
    padding: 5px 10px;
    /* background-color:white ; */
    margin: 5px 0px;
    cursor: pointer;
    &:hover {
      background-color: beige;
    }
  }
`;
export const ItemMsg = styled.div`
  background-color: ${(props) => (props.active ? "beige" : "")};
`;
export const ChatList = styled.div`
  padding: 20px;
  overflow-y: scroll;
  height: calc(100vh - 200px);
  position:relative ;
  & .showMsg{
    min-height: calc(100vh - 350px);
  }
`;
export const ChatBox = styled.div`
  position:sticky ;
  left:0 ;
  bottom:0 ;
  width:100% ;
  background-color:white ;
  border-top:1px solid blue;
  & .chat-box-container{
    margin-top:20px ;
    display:flex ;
    align-items: center ;
    & .icon{
      margin-left:5px;
      color: blue;
      cursor: pointer;
      &:hover{
        color:blueviolet ;
      }
    }
  }
`;
export const ChatItem = styled.div`
  margin: 20px;
  & .user {
    background-color: #80808032;
    padding: 10px;
    border-radius: 10px;
    margin-right: 100px;
    /* margin:5px ; */
  }
  & .admin {
    text-align: right;
    background-color: #096dd98b;
    padding: 10px;
    border-radius: 10px;
    margin-left: 100px;
    /* margin:5px */
  }
`;
