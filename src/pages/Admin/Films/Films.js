/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
import React, { Fragment, useEffect } from 'react'
import { Table, Input, Button } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';


const { Search } = Input;

export default function Films(props) {

  const { arrFilmsDefault } = useSelector(state => state.QuanLyPhimReducer)

  const dispatch = useDispatch()

  // console.log({ arrFilmsDefault })

  useEffect(() => {
    dispatch(layDanhSachPhimAction())
  }, [])

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      width: '10%',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      width: '10%',
      render: (text, record, index) => {
        // return <div key={index} className='w-12 h-12 rounded' style={{ background: `url(${record.hinhAnh})`, backgroundPosition: 'center', backgroundSize: '100%' }}>
        return <img className='w-12 h-12' src={text} alt={record.maPhim} onError={(e) => {
          e.target.onError = null;
          e.target.src = `https://picsum.photos/id/${index}/50/50`
          console.log('error', e)
        }} />

        {/* </div> */ }
      }
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      width: '20%',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      }
    },

    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      width: '40%',
      render: (text, film, index) => {
        // console.log({ text })
        return <Fragment key={index}>
          {text.length > 50 ? text.substr(0, 50) + '...' : text}
        </Fragment>
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'maPhim',
      width: '20%',
      render: (text, film) => {
        return <Fragment >
          <NavLink to={`/admin/films/edit/${film.maPhim}`}>
            <EditOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
          </NavLink>
          <span style={{ cursor: 'pointer' }} onClick={() => {
            //Gọi Action Xóa
            if (window.confirm('Bạn có chắc muốn xóa phim ' + film.tenPhim)) {
              dispatch(xoaPhimAction(film.maPhim))
            }
          }}>
            <DeleteOutlined className='mx-2' style={{ color: '#FF0000 ', fontSize: '20px' }} />
          </span>
          <NavLink key={1} className=" mr-2 text-2xl" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={() => {
            localStorage.setItem('filmParams', JSON.stringify(film));
          }}><CalendarOutlined style={{ color: 'green' }} /> </NavLink>

        </Fragment>
      }
    }
  ];

  const data = arrFilmsDefault

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    console.log({ value })

    dispatch(layDanhSachPhimAction(value))
  }
  return (
    <div>

      <h3 className="text-4xl">Quản lý Phim</h3>

      <Button className="mb-5" onClick={() => {
        history.push('/admin/films/addfilm');
      }}>Thêm phim</Button>

      <Search
        className="mb-5"
        placeholder="Search"
        enterButton={<SearchOutlined className='pb-2' />}
        size="large"
        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />

    </div>
  )
}
