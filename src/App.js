import React, { lazy, Suspense } from 'react'
import { createBrowserHistory } from 'history'
import { Router, Switch, Route } from 'react-router'
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import CheckoutTemplate from './templates/CheckOutTemplate/CheckOutTemplate';
import CheckOut from './pages/CheckOut/CheckOut';
import Login from './pages/Login/Login';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import AddFilm from './pages/Admin/Films/AddFilm/AddFilm';
import Edit from './pages/Admin/Films/Edit/Edit';
import ListUser from './pages/Admin/Users/ListUser';
import AddUser from './pages/Admin/Users/AddUser';
import EditUser from './pages/Admin/Users/EditUser';
import EditProfile from './pages/Profile/EditProfile';

// const CheckOutTemplate = lazy(() => import('./templates/CheckOutTemplate/CheckOutTemplate'))

export const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Loading/>
      <Switch>

        <HomeTemplate path='/' exact Component={Home} />
        <HomeTemplate path='/home' exact Component={Home} />
        <HomeTemplate path='/contact' exact Component={Contact} />
        <HomeTemplate path='/news' exact Component={News} />
        <HomeTemplate path='/detail/:id' exact Component={Detail} />
        <HomeTemplate path='/profile/:taikhoan' exact Component={Profile} />
        <HomeTemplate path='/profile/:taikhoan/edit' exact Component={EditProfile} />

        <CheckoutTemplate path='/checkout/:id' exact Component={CheckOut} />

        <UserTemplate path='/login' exact Component={Login} />
        <UserTemplate path='/register' exact Component={Register} />

        <AdminTemplate path='/admin' exact Component={ListUser} />
        <AdminTemplate path='/admin/films' exact Component={Films} />
        <AdminTemplate path='/admin/films/edit/:id' exact Component={Edit} />
        <AdminTemplate path='/admin/films/addfilm' exact Component={AddFilm} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={ShowTime} />

        <AdminTemplate path='/admin/users' exact Component={ListUser} />
        <AdminTemplate path='/admin/users/adduser' exact Component={AddUser} />
        <AdminTemplate path='/admin/users/edituser/:taikhoan' exact Component={EditUser} />
        

      </Switch>
    </Router>
  )
}
