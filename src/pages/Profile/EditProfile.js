import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { MA_PHIM } from '../../util/settings/config'
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDungAction, layDanhSachMaLoaiNguoiDungAction, layDanhSachNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../App';

export default function EditProfile(props) {

    const { arrMaLoaiNguoiDung, danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    // console.log('propsss', props.match.params)
    // console.log('danh Sách 11', danhSachNguoiDung)

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(layDanhSachMaLoaiNguoiDungAction())

        dispatch(layDanhSachNguoiDungAction(props.match.params.taikhoan))
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: danhSachNguoiDung[0]?.taiKhoan,
            matKhau: danhSachNguoiDung[0]?.matKhau,
            email: danhSachNguoiDung[0]?.email,
            soDt: danhSachNguoiDung[0]?.soDt,
            maNhom: MA_PHIM,
            hoTen: danhSachNguoiDung[0]?.hoTen,
            maLoaiNguoiDung: danhSachNguoiDung[0]?.maLoaiNguoiDung
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
            soDt: Yup.string()
                .required("Required!"),
            hoTen: Yup.string()
                .required("Required!"),
        }),
        onSubmit: values => {
            dispatch(capNhatThongTinNguoiDungAction(values))
            console.log('valuess', values)
        },
    })

    const renderMaLoaiNguoiDung = () => {
        return arrMaLoaiNguoiDung?.map((loaiNguoiDung, index) => {
            if (loaiNguoiDung.maLoaiNguoiDung === formik.values.maLoaiNguoiDung) {
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
        <div className='back_NNA flex justify-center'>
            <div className="w-full max-w-3xl p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800 user-template-NNA2 h-1/2" >
                <h1 className="text-2xl font-bold text-center text-blue-600 mt-4 mb-16">Cập nhật thông tin</h1>
                <form onSubmit={formik.handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
                    <div className='grid grid-cols-2 gap-4'>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="taiKhoan" className="block text-gray-800">Tài khoản</label>
                            <input value={formik.values.taiKhoan} disabled type="text" name="taiKhoan" placeholder="Username" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-300 text-gray-800 outline-blue-300 " />
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
                            <input disabled value={formik.values.hoTen} onChange={formik.handleChange} type="text" name="hoTen" placeholder="Full name" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-300 text-gray-800 outline-blue-300 " />
                            {formik.errors.hoTen && formik.touched.hoTen && (
                                <p className='text-xs text-red-500'>{formik.errors.hoTen}</p>)}
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="maLoaiNguoiDung" className="block text-gray-800">Mã loại người dùng</label>
                            <select name='maLoaiNguoiDung' defaultValue={formik.values.maLoaiNguoiDung}  className='w-full px-4 py-3 outline-blue-300  rounded-md bg-gray-50' onChange={(e) => {
                                formik.setFieldValue('maLoaiNguoiDung', e.target.value)
                            }}>
                                {renderMaLoaiNguoiDung()}
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-center mt-12'>
                        <button type='submit' class="profile_NNA__button button_update" onClick={()=>{
                            history.goBack()
                        }}>Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
