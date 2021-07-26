import React from 'react';
import { Menu, Layout  } from 'antd';
import { Link } from 'react-router-dom';
import { FormOutlined, HeartOutlined } from '@ant-design/icons';

const { Sider } = Layout; 

export default class SiderCuidadorComp extends React.Component{
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        this.setState({ collapsed });
      };

      render(){
          return(
            <Sider
            breakpoint="lg"
            collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            {this.state.collapsed ? <img className="App-logo" src={"espol2.png"} alt="icon" /> : <img className="App-logo" src={"./espol2.png"} alt="logo" />}
            <br/>
            <br/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item 
              icon={<FormOutlined />}
              key="12">
                <span>
                <span>Citas
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item
              icon={<HeartOutlined />}
              key="111">
                <span>
                
                <span>Seguimientos
                </span>
                </span>
                <Link to="/" />
              </Menu.Item>


            </Menu>
          </Sider>
          );
      }
}