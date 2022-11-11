import React, {  } from "react";
import Slider from "react-slick";
// import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import styleSlick from './MultipleRowSlick.module.css'
import './CSS.css'
import { useDispatch, useSelector } from "react-redux";
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimTypes";




function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-next']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const MultipleRowSlick = (props) => {

  const dispatch = useDispatch()
  const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer)

  const renderFilm = () => {
    return props.arrFilms.slice(0, 24).map((film, index) => {
      return <div key={index} >
        {/* <Film phim={film}/> */}
        <Film_Flip phim={film} />
      </div>
    })
  }



  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />

  };

  let activeClassDC = dangChieu===true ? 'active_Film' : 'none_active_Film';

  let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';
  
  return (
    <div className="MultipleRow ">
      <div className="pl-16 mt-20">
        <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded border-gray-800 border mr-2`} onClick={()=>{
          dispatch({
            type: SET_PHIM_DANG_CHIEU
          })
        }} >PHIM ĐANG CHIẾU</button>
        <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded border-gray-800 border`} onClick={()=>{
           dispatch({
            type: SET_PHIM_SAP_CHIEU
          })
        }} >PHIM SẮP CHIẾU</button>
      </div>

      <Slider {...settings}>
        {renderFilm()}
      </Slider>
    </div>
  );
}


export default MultipleRowSlick;

