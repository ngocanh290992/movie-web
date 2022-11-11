import { GET_THONG_TIN_HE_THONG_RAP, SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType"

const initialState = {
    heThongRapChieu: [],
    arrHeThongRap: []
}

export const QuanLyRapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_HE_THONG_RAP_CHIEU: {
            state.heThongRapChieu = action.heThongRapChieu
            return {...state}
        }

        case GET_THONG_TIN_HE_THONG_RAP: {
            return {...state, arrHeThongRap: action.arrHeThongRap}
        }

        

        default:
            return state
    }
}
