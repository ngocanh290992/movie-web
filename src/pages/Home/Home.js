import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Film from '../../components/Film/Film'
import MultipleRowSlick from '../../components/ReactSlick/MultipleRowSlick'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction'
import { layThongTinLichChieuHeThongRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeMenu from './HomeMenu/HomeMenu'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'

export default function Home(props) {

  const { arrFilms } = useSelector(state => state.QuanLyPhimReducer)
  const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer)
  const dispatch = useDispatch();

  // console.log({arrFilms})

  useEffect(()=>{
    dispatch(layDanhSachPhimAction())
    dispatch(layThongTinLichChieuHeThongRapAction())

  },[])
  return (
    <div >
       <HomeCarousel />

      <div className='mt-2'>
        <MultipleRowSlick arrFilms={arrFilms} />
      </div>

      <div className='container pl-48'>
        <HomeMenu heThongRapChieu={heThongRapChieu}/>
      </div>

    </div>
  )
}
