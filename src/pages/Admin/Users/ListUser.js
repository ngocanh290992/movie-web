import React, { Fragment, useEffect } from 'react'
import { Button, Table, Input } from 'antd'
import { EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';


const { Search } = Input;

export default function ListUser(props) {

    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    // console.log({ danhSachNguoiDung })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction())
    }, [])

    const dataSource = danhSachNguoiDung

    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
        },
        {
            title: 'Mã loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            key: 'maLoaiNguoiDung',
        },
        {
            title: 'Hành động',
            dataIndex: 'taiKhoan',
            key: 'hanhDong',
            render: (text, user) => {
                return <Fragment>
                    <NavLink to={`/admin/users/edituser/${user.taiKhoan}`} >
                        <EditOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
                    </NavLink>
                    <span style={{ cursor: 'pointer' }} onClick={() => {
                        //Gọi Action Xóa
                        if (window.confirm('Bạn có chắc muốn xóa ' + user.taiKhoan + ' ?')) {
                            dispatch(xoaNguoiDungAction(user.taiKhoan))
                        }
                    }}>
                        <DeleteOutlined className='mx-2' style={{ color: '#FF0000 ', fontSize: '20px' }} />
                    </span>
                </Fragment>
            }
        },
    ];

    const onSearch = (value) => {
        // console.log({ value })
        dispatch(layDanhSachNguoiDungAction(value))
    }
    return (
        <div>
            <h3 className="text-4xl">Quản lý Người dùng</h3>

            <Button className="mb-5" onClick={() => {
                history.push('/admin/users/adduser');
            }}>Thêm người dùng</Button>

            <Search
                className="mb-5"
                placeholder="Search"
                enterButton={<SearchOutlined className='pb-2' />}
                size="large"
                onSearch={onSearch}
            />

            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
}
