import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
import { withRouter, Route, useRouteMatch, Switch, Link } from 'react-router-dom';
import CreateBook from "../Component/CreateBook";
import BookList from "../Component/BookList";
import EditBook from "../Component/EditBook";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class AdminPage extends Component{
    state = {
        collapsed: false,
    };



    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    closeSesion = () =>
    {
        localStorage.clear();
        this.props.history.push('/login')
    };

    componentWillMount() {

    }

    render() {
        const { path } = this.props.match;
        const { history } = this.props;
        let selected = '1';
        switch (window.location.pathname) {
            case '/admin/book/list':
                selected = '2';
                break;
            case '/admin/book/edit':
                selected = '3';
                break;
        }
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={[selected]} mode="inline">
                        <div className='logo pt-2 pb-4 pl-5'>
                            <Avatar size={84} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/512px-Closed_Book_Icon.svg.png'}>
                            </Avatar>
                        </div>
                        <Menu.Item key="1" onClick={()=>history.push('/admin')}>
                            <Icon type="book" />
                            <span>Crear Libro</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={()=>history.push('/admin/book/list')}>
                            <Icon type="ordered-list" />
                            <span className='tex'>Lista de libros</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={()=>history.push('/admin/book/edit')} >
                            <Icon type="edit" />
                            <span>Editar libro</span>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={this.closeSesion}>
                            <Icon type="logout" />
                            <span>Cerrar sesión</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        <Route path={path} exact>
                            <CreateBook />
                        </Route>

                        <Route path={`${path}/book/list`} exact>
                            <BookList />
                        </Route>

                        <Route path={`${path}/book/edit`}>
                            <EditBook />
                        </Route>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(AdminPage);