// import { MA_PHIM } from "../util/settings/config";
import { MA_PHIM } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }

    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }

    dangKy = (nguoiDungMoi) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, nguoiDungMoi)
    }

    layDanhSachNguoiDung = (nameSearch = '') => {
        if (nameSearch.trim() != '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_PHIM}&tuKhoa=${nameSearch}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_PHIM}`)
    }

    layDanhSachMaLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }

    themNguoiDung = (nguoiDungMoi) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDungMoi)
    }

    chinhSuaNguoiDung = (model) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, model)
    }

    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }

    capNhatThongTinNguoiDung = (model) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,model)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();