import { Route } from "react-router-dom";
import React, { useState } from "react";
// import { useState } from 'react';
import HeaderLayOut from "../Header";
import Sidebar from "../SiderBar";
import { Layout, Grid } from 'antd';

import  * as Style from "./styles";


const {Content, Sider } = Layout;
const { useBreakpoint } = Grid;

function AdminLayout({ exact, path, component: Component }) {
  // const [isShowSiderBar,setIsShowSiderBar]=useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Layout >
              <Sider
                breakpoint="lg"
                width={270}
                
                collapsedWidth={screens.lg !== true ? 0 : 80}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  
                }}
              >
                <Style.layoutFixedSiderLogo className="logo" />
      
                <Sidebar {...routeProps} />
               
              </Sider>
              <Layout className="site-layout">
                <HeaderLayOut className="site-layout-background" style={{ padding: 0 }} />
                <Content  className="content" 
                style={{
                  margin: '80px 16px 0',
                  height :'calc(100vh - 88px)' ,
                  overflow: 'scroll',
                  background: 'while',
                }}
                >
                  <Style.siteLayout>
                    <Component {...routeProps}/>
                  </Style.siteLayout>
                </Content>
              </Layout>
            </Layout>

          </>
        )
      }}
    />
  );

}
export default AdminLayout