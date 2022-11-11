import React, { useState } from 'react'
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
import { MA_PHIM } from '../../../../util/settings/config';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';



export default function AddFilm(props) {

    const [imgSrc, setImgSrc] = useState('')
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        onSubmit: (values) => {
            console.log({ values })

            values.maNhom = MA_PHIM

            let formData = new FormData();

            for(let key in values){
                if(key !== 'hinhAnh'){
                    formData.append(key, values[key])
                }else{
                    formData.append('File', values.hinhAnh, values.hinhAnh.name)
                }
            }
            dispatch(themPhimUploadHinhAction(formData))
        }
    })

    const handleChangeDatePicker = (value) => {
        // console.log('date', moment(value).format('DD/MM/YYYY'))

        formik.setFieldValue('ngayKhoiChieu', moment(value).format('DD/MM/YYYY'))

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
           
            await  formik.setFieldValue('hinhAnh', file)
            // Tạo đối tượng để đọc file
            // FileReader() là của JavaScript có sẵn
            let reader = new FileReader();

            // Đọc file
            reader.readAsDataURL(file)
            console.log('hình ảnh', e.target.result)
            reader.onload = (e) => {
                setImgSrc(e.target.result) // Hình base 64
            }

           
        }
    }

    return (
        <div>
            <h3 className='text-2xl' >Thêm phim mới</h3>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{ span: 4, }}
                wrapperCol={{ span: 14, }}
                layout="horizontal"
            >

                <Form.Item label="Tên phim">
                    <Input name='tenPhim' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Input name='moTa' onChange={formik.handleChange} />
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
                </Form.Item>

                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('dangChieu')} />
                </Form.Item>

                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('sapChieu')} />
                </Form.Item>

                <Form.Item label="Hot" valuePropName="checked">
                    <Switch onChange={handleChangeSwitch('hot')} />
                </Form.Item>

                <Form.Item label="Đánh giá"  >
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type={'file'} onChange={handleChangeFile}  accept="image/*"/>
                    <br />
                    <img style={{ height: 150 }} src={imgSrc} alt='...' />
                </Form.Item>

                <Form.Item label="Thêm phim mới">
                    <button className='border px-2 py-1 rounded-md hover:bg-slate-700 hover:text-slate-200 duration-1000' style={{ borderColor: '#012d56' }} type='submit'>Thêm phim</button>
                </Form.Item>
            </Form>

        </div>
    )
}
