import { Tabs } from 'antd';
import moment from 'moment';
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';

export default function HomeMenu(props) {
  const { heThongRapChieu } = props;



  return (
    <div className=''>
      <Tabs

        tabPosition='left'
        items={heThongRapChieu.map((heThongRap, index) => {
          return {
            label: <img src={heThongRap.logo} className='rounded-full w-10 h-10' alt={heThongRap.maHeThongRap} />,
            key: index,
            children: <Tabs
              tabPosition='left'
              items={heThongRap.lstCumRap.map((cumRap, index1) => {
                return {
                  label: <div className='flex ' style={{ width: '300px' }} >
                    <img src={cumRap.hinhAnh} width="50" alt={cumRap.tenCumRap} />
                    <div className="text-left ml-2">
                      {cumRap.tenCumRap}
                      <p className="text-red-200">Chi tiết</p>
                    </div>
                  </div>,
                  key: index1,
                  children: cumRap.danhSachPhim.slice(0,4).map((phim, index) => {
                    return <Fragment key={index}>
                      <div className='flex flex-row my-2' >
                        <div style={{ backgroundImage: `url(${phim.hinhAnh})`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
                          <img className='w-10 h-10 opacity-0' src={phim.hinhAnh} alt={phim.tenPhim} />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-2xl text-green-700" >{phim.tenPhim}</h1>
                          <p>{cumRap.diaChi}</p>
                          <div className="grid grid-cols-6 gap-6">
                            {phim.lstLichChieuTheoPhim?.slice(0, 4).map((lichChieu, index) => {
                              return <NavLink className="text-2xl text-green-400" to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            })}
                          </div>
                        </div>
                      </div>
                      <hr />
                    </Fragment>

                  })
                }
              })}
            />
          }
        })}
      // items={new Array(heThongRapChieu.length).fill(null).map((_, i) => {
      //   const id = String(i + 1);
      //   return {
      //     label: <img src={heThongRapChieu[i].logo} className='rounded-full w-10 h-10'  alt={id} />,
      //     key: id,
      //     children: `${heThongRapChieu[i].tenHeThongRap}`,
      //   };
      // })}
      >
      </Tabs>

    </div>
  )
}
