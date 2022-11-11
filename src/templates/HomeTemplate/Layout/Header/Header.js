import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';


const { Option } = Select;

export default function Header() {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    // console.log({userLogin})

    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value)
    };

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            // console.log('lodashhh', _.isEmpty(userLogin))
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 rounded">{t('Sign in')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 rounded mr-2">{t('Sign up')}</button>
            </Fragment>
        }

        return <div className='flex flex-row items-center'>
            <button className='flex flex-row items-center' onClick={() => {
                history.push(`/profile/${userLogin.taiKhoan}`)
            }}>
                <div  className="text-2xl mr-2 ">
                    {/* Lấy 1 chữ cái , bắt đầu từ vị trí 0*/}
                    <img className='rounded-full' src='https://picsum.photos/50' alt='userLogin'/>
                    {/* {userLogin.hoTen.substr(0, 1)} */}
                </div>
                Hello  {userLogin.hoTen}
            </button>
            <button onClick={() => {
                // xóa dữ liệu localStore
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                // chuyển về trang Home
                history.push('/home');
                // đồng thời load lại trang
                window.location.reload();
            }} className="mx-3 text-dark font-semibold">
              {t('Sign out')}
            </button>
        </div>
    }

    return (
        <header className="p-2 bg-gray-800 bg-opacity-40 text-white fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to='/' aria-label="Back to homepage" className="flex items-center p-2 pl-48">
                    <img src='https://picsum.photos/200' className='w-16 rounded-full' alt='logo' />
                </NavLink>
                <div className="items-stretch hidden space-x-3 lg:flex">
                    <div className="flex">
                        <NavLink rel="noopener noreferrer" to='/home' className="flex items-center px-4 -mb-1  text-white " activeClassName='border-b-2 border-sky-500'>{t('Home')}</NavLink>
                    </div>
                    <div className="flex">
                        <NavLink rel="noopener noreferrer" to='/contact' className="flex items-center px-4 -mb-1  text-white" activeClassName='border-b-2 border-sky-500'>{t('Contact')}</NavLink>
                    </div>
                    <div className="flex">
                        <NavLink rel="noopener noreferrer" to='/news' className="flex items-center px-4 -mb-1   text-white" activeClassName='border-b-2 border-sky-500'>{t('News')}</NavLink>
                    </div>
                   

                </div>

                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}

                    <Select defaultValue="en" style={{ width: 80 }} onChange={handleChange}>
                        <Option value="en">ENG</Option>
                        <Option value="chi">CHI</Option>
                        <Option value="vie">VIE</Option>
                    </Select>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
