

import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styleLoading from  './Loading.module.css'


export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer);


    return (
        <Fragment>
            {isLoading ?
                 <div className={styleLoading.bgLoading}>
                 <img src={require('../../assets/img/loading_gif.gif')} alt='loading'/>
             </div> : ''

            }
        </Fragment>
    )
}
