import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import './UserTemplate.css'




export const UserTemplate = (props) => {

    const { Component, ...restProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return <Route {...restProps} render={(propsRoute) => {

        return <Fragment>
           
           
                <div className="flex justify-center items-center h-screen " id="background-userTemplate-NNA">
                    <div className=" w-full h-full flex justify-center items-center user-template-NNA1" >
                    <Component {...propsRoute} />
                    </div>
                    
                </div>
        </Fragment>
    }} />

}