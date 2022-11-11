// import axios from 'axios'
import { quanLyPhimService } from '../../services/QuanLyPhimService';
// import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from '../types/CaroselTypes';


export const getCarouselAction = () => {
    return async (dispatch) => {
        try{
            const result = await quanLyPhimService.layDanhSachBanner();
            
            dispatch({
                type: SET_CAROUSEL,
                arrCarousel: result.data.content
            })

        }catch(errors){
            console.log('error', errors)
        }
    }
}