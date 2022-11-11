import { Rate, Tabs } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinLichChieuPhimAction } from '../../redux/actions/QuanLyRapAction'
import './Detail.css'
import '../../assets/styles/circle.css'
import { NavLink } from 'react-router-dom'

// import { CustomCard } from '@tsamantanis/react-glassmorphism'
// import '@tsamantanis/react-glassmorphism/dist/index.css'
// import { Button } from '@tsamantanis/react-glassmorphism'
// import '@tsamantanis/react-glassmorphism/dist/index.css'

export default function Detail(props) {
    // console.log('film Detail', props)
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer)
    console.log('filmDetail', filmDetail)
    const dispatch = useDispatch()


    useEffect(() => {
        let { id } = props.match.params
        dispatch(layThongTinLichChieuPhimAction(id))
    }, [])

    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className='glassmorphism-ngoc-anh ' style={{ minHeight: '100vh' }}>
                <div className="grid grid-cols-12 mt-48 gap-2">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img className="col-span-1" src={filmDetail.hinhAnh} style={{ width: '100%', height: 300 }} alt="123" />
                            <div className="col-span-2 ml-5" style={{ marginTop: '25%' }}>
                                <p className="text-sm">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                                <p className="text-4xl leading-3">{filmDetail.tenPhim}</p>
                                <p>{filmDetail.moTa}</p>
                            </div>
                        </div>

                    </div>

                    <div className="col-span-4">
                        <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span className="text-white">

                                {filmDetail.danhGia * 10}%
                            </span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>

                            </div>

                        </div>
                        <br />

                    </div>
                </div>

                <div className='mt-10 ml-72 w-2/3 container bg-white px-5 py-5' style={{minHeight: 500}}>
                    <Tabs
                        defaultActiveKey="1"
                        centered
                        items={new Array(3).fill(null).map((_, i) => {
                            const id = String(i + 1);
                            if (id == 1) {
                                return {
                                    label: 'Lịch chiếu',
                                    key: id,
                                    children: <div >
                                            <Tabs
                                                tabPosition={'left'}
                                                items={filmDetail.heThongRapChieu?.map((htr, index) => {
                                                    return {
                                                        label: <div className="flex flex-row items-center justify-center">
                                                            <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                                                            <div className="text-center ml-2">
                                                                {htr.tenHeThongRap}
                                                            </div>
                                                        </div>,
                                                        key: index,
                                                        children: htr.cumRapChieu?.map((cumRap, index) => {
                                                            return <div className="mt-5" key={index}>
                                                                <div className="flex flex-row">
                                                                    <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
                                                                    <div className="ml-2">
                                                                        <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                                                                        <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                                    {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                                        return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 font-bold">
                                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                        </NavLink>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                })}
                                            />
                                        </div> ,
                                }
                            }else if(id == 2) {
                                return {
                                    label: 'Thông tin',
                                    key: id,
                                    children: 'Thông tin'
                                }
                            }else{
                                return {
                                    label: 'Đánh giá',
                                    key: id,
                                    children: 'Đánh giá',
                                }
                            }

                        })}
                    />
                </div>

            </div>

        </div>
    )
}
