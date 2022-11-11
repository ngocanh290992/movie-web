import { MA_PHIM } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {

    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }

    layThongTinLichChieuHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MA_PHIM}`)
    }

    layThongTinHeThongRap = () => {
        return this.get('/api/QuanLyRap/LayThongTinHeThongRap')
    }

    layThongTinLichChieuPhim = (id) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    }

    layThongTinCumRap = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    }
}

export const quanLyRapService = new QuanLyRapService();