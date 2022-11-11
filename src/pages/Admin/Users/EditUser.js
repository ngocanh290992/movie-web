import React, { useEffect } from 'react'
import { MA_PHIM } from '../../../util/settings/config';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { chinhSuaNguoiDungAction, layDanhSachMaLoaiNguoiDungAction, layDanhSachNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';


export default function EditUser(props) {


  const {arrMaLoaiNguoiDung, danhSachNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(layDanhSachMaLoaiNguoiDungAction())
    dispatch(layDanhSachNguoiDungAction(props.match.params.taikhoan))
  },[])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: danhSachNguoiDung[0].taiKhoan,
      matKhau: danhSachNguoiDung[0].matKhau,
      email: danhSachNguoiDung[0].email,
      soDt: danhSachNguoiDung[0].soDt,
      maNhom: MA_PHIM,
      hoTen: danhSachNguoiDung[0].hoTen,
      maLoaiNguoiDung: danhSachNguoiDung[0].maLoaiNguoiDung
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Required!"),
      matKhau: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required!"),
      soDt: Yup.number()
        .required("Required!"),
      hoTen: Yup.string()
        .required("Required!"),
    }),
    onSubmit: values => {
      dispatch(chinhSuaNguoiDungAction(values))
    },
  });

  const renderMaLoaiNguoiDung = () => {
    return arrMaLoaiNguoiDung?.map((loaiNguoiDung, index)=>{
      if(loaiNguoiDung.maLoaiNguoiDung === formik.values.maLoaiNguoiDung){
        return <option key={index} value={loaiNguoiDung.maLoaiNguoiDung} selected>
        {loaiNguoiDung.tenLoai}
      </option>
      }
      return <option key={index} value={loaiNguoiDung.maLoaiNguoiDung}>
        {loaiNguoiDung.tenLoai}
      </option>
    })
  }
  return (
    <div className='flex justify-center'>
      <div className="w-full max-w-3xl p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 user-template-NNA2" >
        <h1 className="text-2xl font-bold text-center text-blue-600">Chỉnh sửa người dùng</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className='grid grid-cols-2 gap-4'>
            <div className="space-y-1 text-sm">
              <label htmlFor="taiKhoan" className="block text-gray-800">Tài khoản</label>
              <input value={formik.values.taiKhoan} disabled onChange={formik.handleChange} type="text" name="taiKhoan" placeholder="Username" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-300 text-gray-800 outline-blue-300 " />
              {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                <p className='text-xs text-red-500'>{formik.errors.taiKhoan}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="matKhau" className="block text-gray-800">Mật khẩu</label>
              <input value={formik.values.matKhau} onChange={formik.handleChange} type="password" name="matKhau" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.matKhau && formik.touched.matKhau && (
                <p className='text-xs text-red-500'>{formik.errors.matKhau}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-800">Email</label>
              <input value={formik.values.email} onChange={formik.handleChange} type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.email && formik.touched.email && (
                <p className='text-xs text-red-500'>{formik.errors.email}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="soDt" className="block text-gray-800">Số điện thoại</label>
              <input value={formik.values.soDt} onChange={formik.handleChange} type="tel" name="soDt" placeholder="Phone number" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.soDt && formik.touched.soDt && (
                <p className='text-xs text-red-500'>{formik.errors.soDt}</p>)}
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="hoTen" className="block text-gray-800">Họ tên</label>
              <input value={formik.values.hoTen} onChange={formik.handleChange} type="text" name="hoTen" placeholder="Full name" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <p className='text-xs text-red-500'>{formik.errors.hoTen}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="maLoaiNguoiDung" className="block text-gray-800">Mã loại người dùng</label>
              <select name='maLoaiNguoiDung' defaultValue={formik.values.maLoaiNguoiDung}  className='w-full px-4 py-3 outline-blue-300  rounded-md bg-gray-50' onChange={(e)=>{
                formik.setFieldValue('maLoaiNguoiDung', e.target.value)
              }}>
                {renderMaLoaiNguoiDung()}
              </select>
              
            </div>
          </div>
          <div className='flex justify-center'>
            <button type='submit' className="block w-2/3 p-3 text-center rounded-md text-gray-50 bg-indigo-700 hover:bg-blue-600 duration-300">Edit User</button>
          </div>

        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300" />
          {/* <p className="px-3 text-sm text-gray-600">Login with social accounts</p> */}
          <div className="flex-1 h-px sm:w-16 bg-gray-300" />
        </div>
      

      </div>
    </div>

  )
}

