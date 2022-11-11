import React, { useEffect } from 'react'
import { MA_PHIM } from '../../../util/settings/config';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachMaLoaiNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';


export default function AddUser(props) {

  const {arrMaLoaiNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer)

  // console.log({arrMaLoaiNguoiDung})

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(layDanhSachMaLoaiNguoiDungAction())
  },[])

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: MA_PHIM,
      hoTen: '',
      maLoaiNguoiDung: 'KhachHang'
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
      // console.log('valuess', values)
      dispatch(themNguoiDungAction(values))
    },
  });

  const renderMaLoaiNguoiDung = () => {
    return arrMaLoaiNguoiDung?.map((loaiNguoiDung, index)=>{
      return <option key={index} value={loaiNguoiDung.maLoaiNguoiDung}>
        {loaiNguoiDung.tenLoai}
      </option>
    })
  }
  return (
    <div className='flex justify-center'>
      <div className="w-full max-w-3xl p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 user-template-NNA2" >
        <h1 className="text-2xl font-bold text-center text-blue-600">Thêm người dùng</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className='grid grid-cols-2 gap-4'>
            <div className="space-y-1 text-sm">
              <label htmlFor="taiKhoan" className="block text-gray-800">Tài khoản</label>
              <input onChange={formik.handleChange} type="text" name="taiKhoan" placeholder="Username" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                <p className='text-xs text-red-500'>{formik.errors.taiKhoan}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="matKhau" className="block text-gray-800">Mật khẩu</label>
              <input onChange={formik.handleChange} type="password" name="matKhau" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.matKhau && formik.touched.matKhau && (
                <p className='text-xs text-red-500'>{formik.errors.matKhau}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-800">Email</label>
              <input onChange={formik.handleChange} type="email" name="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.email && formik.touched.email && (
                <p className='text-xs text-red-500'>{formik.errors.email}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="soDt" className="block text-gray-800">Số điện thoại</label>
              <input onChange={formik.handleChange} type="tel" name="soDt" placeholder="Phone number" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.soDt && formik.touched.soDt && (
                <p className='text-xs text-red-500'>{formik.errors.soDt}</p>)}
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="hoTen" className="block text-gray-800">Họ tên</label>
              <input onChange={formik.handleChange} type="text" name="hoTen" placeholder="Full name" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 outline-blue-300 " />
              {formik.errors.hoTen && formik.touched.hoTen && (
                <p className='text-xs text-red-500'>{formik.errors.hoTen}</p>)}
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="maLoaiNguoiDung" className="block text-gray-800">Mã loại người dùng</label>
              <select name='maLoaiNguoiDung' defaultValue={'KhachHang'}  className='w-full px-4 py-3 outline-blue-300  rounded-md bg-gray-50' onChange={(e)=>{
                formik.setFieldValue('maLoaiNguoiDung', e.target.value)
              }}>
                {renderMaLoaiNguoiDung()}
              </select>
              
            </div>
          </div>
          <div className='flex justify-center'>
            <button type='submit' className="block w-2/3 p-3 text-center rounded-md text-gray-50 bg-indigo-700 hover:bg-blue-600 duration-300">Add User</button>
          </div>

        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300" />
          {/* <p className="px-3 text-sm text-gray-600">Login with social accounts</p> */}
          <div className="flex-1 h-px sm:w-16 bg-gray-300" />
        </div>
      

      </div>
    </div>

    // <div className='flex justify-center items-center'>

    //   <div className="flex flex-col p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800 border_glassmorphism ">
    //     <div className="mb-8 text-center">
    //       <h1 className="my-3 text-4xl font-bold">Add User</h1>
    //     </div>
    //     <form noValidate action className="space-y-12 ng-untouched ng-pristine ng-valid">
    //       <div className="space-y-4">
    //         <div>
    //           <label htmlFor="taiKhoan" className="block mb-2 text-sm">Tài khoản</label>
    //           <input type="text" name="taiKhoan" id="taiKhoan" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
    //         </div>
    //         <div>
    //           <label htmlFor="password" className="text-sm">Mật khẩu</label>
    //           <input type="password" name="matKhau" id="matKhau" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
    //         </div>
    //       </div>  
    //       <div className="space-y-2">
    //         <div>
    //           <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-red-600 text-gray-50">Sign in</button>
    //         </div>
    //         <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
    //           <a rel="noopener noreferrer" href="#" className="hover:underline text-red-600">Sign up</a>.
    //         </p>
    //       </div>
    //     </form>
    //   </div>


    // </div>
  )
}
