import { quanLyRapService } from "../../services/QuanLyRapService";
import { GET_THONG_TIN_HE_THONG_RAP, SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";


export const  layThongTinLichChieuHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            
            const {data} = await quanLyRapService.layThongTinLichChieuHeThongRap();

            //Sau khi lấy dữ liệu từ api về => redux (reducer)
             dispatch({
                 type: SET_HE_THONG_RAP_CHIEU,
                 heThongRapChieu: data.content
             })
        }catch (errors) {
            console.log('errors',errors)
        }
    };
}

export const layThongTinHeThongRapAction = () => {
    return async(dispatch) => {
        // console.log('action', dispatch)
        try{
            const {data} = await quanLyRapService.layThongTinHeThongRap();
            // console.log('data', data.content)
            dispatch({
                type: GET_THONG_TIN_HE_THONG_RAP,
                arrHeThongRap: data.content
            })

        }catch(errors){
            console.log('errors', errors)
        }
    }
}

export const layThongTinLichChieuPhimAction = (id) => {
    return async dispatch => {
        try{
            const {data} = await quanLyRapService.layThongTinLichChieuPhim(id);
            // console.log('data', data.content)
            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: data.content
            })
        }catch(errors){
            console.log('errors', errors)
        }
    }
}