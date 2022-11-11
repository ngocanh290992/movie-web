import React, { useEffect, useState } from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimAction';
import { MA_PHIM } from '../../../../util/settings/config';



export default function Edit(props) {

    const [imgSrc, setImgSrc] = useState('')

    const {thongTinPhim} = useSelector(state => state.QuanLyPhimReducer)

    console.log({thongTinPhim})

    const dispatch = useDispatch()

    useEffect(()=>{

        let {id} = props.match.params
        dispatch(layThongTinPhimAction(id))
    },[])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            maPhim:thongTinPhim.maPhim,
            hinhAnh: null,
            maNhom: thongTinPhim.maNhom
        },
        onSubmit: (value) => {
            console.log({ value })

            // Tạo đối tượng formData để đưa giá trị từ formil vào formData
            let formData = new FormData();
            for(let key in value){
                if(key !== 'hinhAnh'){
                    formData.append(key, value[key])
                }else{
                    if(value.hinhAnh !== null){
                        formData.append('File', value.hinhAnh, value.hinhAnh.name)
                    }
                }
            }
            dispatch(capNhatPhimUploadAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        // console.log('date', moment(value).format('DD/MM/YYYY'))

        formik.setFieldValue('ngayKhoiChieu', moment(value))

    }

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        //Lấy file từ e
        let file = e.target.files[0]

        // Xét kiểu dữ liệu của file - chỉ lấy định dạng ảnh
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            
            await formik.setFieldValue('hinhAnh', file);
            // Tạo đối tượng để đọc file
            // FileReader() là của JavaScript có sẵn
            let reader = new FileReader();
            // Đọc file
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result) // Hình base 64
            }
        }
    }

    return (
        <div>
            <h3 className='text-2xl' >Chỉnh sửa phim</h3>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{ span: 4, }}
                wrapperCol={{ span: 14, }}
                layout="horizontal"
            >

                <Form.Item label="Tên phim">
                    <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim}/>
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer}/>
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa}/>
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format="DD/MM/YYYY" onChange={handleChangeDatePicker} defaultValue={moment(formik.values.ngayKhoiChieu)} />
                    {/* <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} /> */}
                </Form.Item>

                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu}/>
                </Form.Item>

                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu}/>
                </Form.Item>

                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot}/>
                </Form.Item>

                <Form.Item label="Đánh giá"  >
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type={'file'} onChange={handleChangeFile}  accept="image/*"/>
                    <br />
                    <img style={{ height: 150 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt='...' />
                </Form.Item>

                <Form.Item label="Thêm phim mới">
                    <button className='border px-2 py-1 rounded-md hover:bg-slate-700 hover:text-slate-200 duration-1000' style={{ borderColor: '#012d56' }} type='submit'>Cập nhật phim</button>
                </Form.Item>
            </Form>

        </div>
    )
}
