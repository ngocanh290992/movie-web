import { Fragment, useEffect } from "react"
import { Route, Redirect } from "react-router"
import './LayoutAdmin.css'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
    UserAddOutlined 
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { history } from "../../App";
const { Header, Sider, Content } = Layout;

export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    // console.log({ userLogin })


    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (!localStorage.getItem(USER_LOGIN)) {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />
    }


    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Bạn không có quyền truy cập vào trang này !')
        return <Redirect to='/' />

    }

    return <Route {...restProps} render={(propsRoute) => {
        let logoCss = collapsed ? "ml-3" : "ml-7";

        return <Fragment>

            <Layout style={{ minHeight: '100vh' }} >
                <Sider
                    className="border_glassmorphism m-4 mr-0"
                    width='250'
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <div className={`logo py-4 ${logoCss} duration-300`} >
                        <img style={{ cursor: 'pointer' }} onClick={() => {
                            history.push('')
                        }} className='rounded-full' src='https://picsum.photos/51' alt='adminTemplate' />

                    </div>
                    <div className="flex justify-center">
                        <hr className="mb-2 w-52 " />
                    </div>


                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Users',
                                children: [
                                    {
                                        key: '11',
                                        icon: <UserOutlined />,
                                        label: <NavLink to='/admin/users'>List User</NavLink>,
                                    },
                                    {
                                        key: '12',
                                        icon: <UserAddOutlined />,
                                        label: <NavLink to='/admin/users/adduser'>Add User</NavLink>,
                                    },

                                ]
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'Films',
                                children: [
                                    {
                                        key: '21',
                                        icon: <VideoCameraOutlined />,
                                        label: <NavLink to='/admin/films'>List Film</NavLink>,
                                    },
                                    {
                                        key: '22',
                                        icon: <VideoCameraAddOutlined />,
                                        label: <NavLink to='/admin/films/addfilm'>Add Film</NavLink>,
                                    },

                                ]
                            },

                        ]}
                    />
                </Sider>
                <Layout className="site-layout h-full" style={{ minHeight: '100vh' }}>
                    <Header
                        className="site-layout-background min-h-[12%] flex justify-between mt-4 mx-4 border_glassmorphism "
                        style={{
                            padding: 0,
                        }}
                    >
                        <div className="trigger ml-4 flex items-center cursor-pointer" onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? <MenuUnfoldOutlined className="text-2xl" /> : <MenuFoldOutlined className="text-2xl" />}
                        </div>

                        <div className="m-3 flex items-center">
                            <button onClick={() => {
                                history.push(`/profile/${userLogin.taiKhoan}`)
                            }}>
                                <div className="flex items-center m-3 border_glassmorphism2" >
                                    <img className='rounded-full ml-3' src='https://picsum.photos/50' alt='adminTemplate' />
                                    <p className="text-xl text-gray-600 mb-0 mx-3">{userLogin.hoTen}</p>
                                </div>
                            </button>
                            <button onClick={() => {
                                // xóa dữ liệu localStore
                                localStorage.removeItem(USER_LOGIN);
                                localStorage.removeItem(TOKEN);
                                // chuyển về trang Home
                                history.push('/home');
                                // đồng thời load lại trang
                                window.location.reload();
                            }} className="mx-3 text-dark font-semibold hover:text-red-600 duration-300">
                                Đăng xuất
                            </button>

                        </div>

                    </Header>
                    <Content
                        className="site-layout-background bg_white_header mt-6 m-4 border_glassmorphism"
                        style={{

                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>

        </Fragment>
    }} />
}