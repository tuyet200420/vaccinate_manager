import { Row, Col, Menu, Dropdown, Button} from 'antd';
import history from '../../../utils/history';
import {  useState } from 'react'
import { ShoppingCartOutlined, SearchOutlined,DownOutlined} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';


import * as Style from './styles'

import styled from 'styled-components';
function Header({sticky}) {
  

  // function handleSearchProduct(value) {
  //   setSearchKey(value);
  //   dispatch(getProductListAction({
  //     page: 1,
  //     categoriesSelected,
  //     priceRange,
  //     searchKey: value,
  //   }));
  // }
  const menu = (
    <Menu >
      <Menu.Item ></Menu.Item>

    </Menu>
  );
  return (
    <>
    hhh
      <Style.HeaderTop  className={sticky && "sticky"}>
        <Style.CustomSpace >
          <div>
            <Style.CustomButton
              type="link"
              onClick={() => history.push({
                pathname: '/login',
                state: {
                  prevPath: history.location.pathname,
                },
              })}
            >
              Đăng ký / Đăng nhập
            </Style.CustomButton>
          </div>
          <Style.Cart>
            <ShoppingCartOutlined />
          </Style.Cart>
          <Dropdown overlay={menu}>
            <Button>
            <DownOutlined />
            </Button>
          </Dropdown>
        </Style.CustomSpace>
      </Style.HeaderTop>
      <Style.HeaderContainer >

        <Row
          style={{ alignItems: 'center' }}
          gutter={[10, 5]}>
          <Col sm={24}
            md={15}>
            {/* <Style.Logo onClick={() => { history.push("/") }} src={logo} alt="" /> */}
          </Col>
          <Col

            xs={24}
            sm={24}
            md={9}>
            <Style.InputSearch
              size="large"
              suffix={<SearchOutlined />}
              placeholder="Tìm kiếm..." />
          </Col>
        </Row>
      </Style.HeaderContainer>

    </>
  )
}
export default Header