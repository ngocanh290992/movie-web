import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import './HomeCarousel.css'



export default function HomeCarousel() {
    const { arrCarousel } = useSelector(state => state.CarouselReducer)

    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch(getCarouselAction())
    
    },[])

    const renderImgCarousel = () => {
        return arrCarousel?.map((item, index) => {
            const contentStyle = {
                height: '500px',
                color: '#fff',
                lineHeight: '160px',
                textAlign: 'center',
                
                backgroundImage: `url(${item.hinhAnh})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%'
            };
            return <div key={index}>
                <div style={contentStyle}>
                    <img src={item.hinhAnh} className='h-full opacity-0' alt={item.maBanner} />
                </div>
            </div>
        })


    }
    return (
        <Carousel  >

            {renderImgCarousel()}

        </Carousel>
    )
}
