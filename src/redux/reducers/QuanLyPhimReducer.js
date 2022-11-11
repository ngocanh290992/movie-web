import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimTypes"
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";

const initialState = {
  arrFilms: [
    {
      "maPhim": 10735,
      "tenPhim": "Môn Phái Võ Mèo: Huyền Thoại Một Chú Chó 1",
      "biDanh": "mon-phai-vo-meo-huyen-thoai-mot-chu-cho-1",
      "trailer": "",
      "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/mon-phai-vo-meo-huyen-thoai-mot-chu-cho_gp00.jpg",
      "moTa": "Từ một chú chó gầy gò nhỏ con hay bị bắt nạt, tôi bất đắc dĩ trở thành samurai cứu cả làng mều! 2",
      "maNhom": "GP00",
      "ngayKhoiChieu": "2022-10-06T19:54:43.807",
      "danhGia": 6,
      "hot": false,
      "dangChieu": true,
      "sapChieu": false
    },
    {
      "maPhim": 10735,
      "tenPhim": "Môn Phái Võ Mèo: Huyền Thoại Một Chú Chó 1",
      "biDanh": "mon-phai-vo-meo-huyen-thoai-mot-chu-cho-1",
      "trailer": "",
      "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/mon-phai-vo-meo-huyen-thoai-mot-chu-cho_gp00.jpg",
      "moTa": "Từ một chú chó gầy gò nhỏ con hay bị bắt nạt, tôi bất đắc dĩ trở thành samurai cứu cả làng mều! 2",
      "maNhom": "GP00",
      "ngayKhoiChieu": "2022-10-06T19:54:43.807",
      "danhGia": 6,
      "hot": false,
      "dangChieu": true,
      "sapChieu": false
    }
  ],
  arrFilmsDefault: [],
  dangChieu: true,
  sapChieu: true,
  filmDetail: {},
  thongTinPhim: {}
}

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilms = action.arrFilms;
      state.arrFilmsDefault = action.arrFilms
      return { ...state }
    }

    case SET_PHIM_DANG_CHIEU: {

      state.dangChieu = !state.dangChieu;

      state.arrFilms = state.arrFilmsDefault.filter(film => film.dangChieu === state.dangChieu);
      return { ...state }

    }

    case SET_PHIM_SAP_CHIEU: {

      state.sapChieu = !state.sapChieu;
      state.arrFilms = state.arrFilmsDefault.filter(film => film.sapChieu === state.sapChieu);
      return { ...state }
    }

    case SET_CHI_TIET_PHIM: {
      // console.log('actionnn', action)
      state.filmDetail = action.filmDetail
      return { ...state }
    }

    case SET_THONG_TIN_PHIM: {
      state.thongTinPhim = action.thongTinPhim
      return {...state}
    }

    default:
      return state
  }
}
