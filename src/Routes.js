import {
    BrowserRouter as Router,
    Route,Redirect
} from 'react-router-dom';
import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Dashboard from './components/Dashboard/Dashboard';
import checkToken from './resolvers/checkToken';
import FormUser from './components/FormUser/FormUser';
import FormDevice from './components/FormDevice/FormDevice';
import Profile from './components/Profile/Profile';
import Devices from './components/Devices/Devices';
import Device from './components/Device/Device';
import Users from './components/Users/Users';
import User from './components/User/User';
import UpdateDevice from './components/UpdateDeviceFrom/UpdateDeviceForm';
import UpdateMe from './components/FormMe/FormMe';
import galeriaDevices from './components/galeriaDevices/galeriaDevices';
import Records from './components/Records/Records';
import ReportTax from './components/ReportTax/ReportTax';
import Reports from './components/Reports/Reports';
import Report from './components/Report/Report.js';


class Routes extends Component{
    
    render(){
        
        const PrivateRoute = ({component:Component, ...rest}) => (
            <Route {...rest} render = {(props) => (
                checkToken() === true ? <Component {...props}/> : <Redirect to="/login"/>
            )}/>
        )
        return(
            <Router>
                <main>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/login' component={Login}/>
                    <PrivateRoute exact path='/logout' component={Logout}/>
                    <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                    <PrivateRoute exact path='/addUser' component={FormUser}/>
                    <PrivateRoute exact path='/addDevice' component={FormDevice}/>
                    <PrivateRoute exact path='/profile' component={Profile}/>
                    <PrivateRoute exact path='/devices' component={Devices}/>
                    <PrivateRoute exact path='/device/:id' component={Device}/>
                    <PrivateRoute exact path='/device/update/:id' component={UpdateDevice}/>
                    <PrivateRoute exact path='/users' component={Users}/>
                    <PrivateRoute exact path='/user/:id' component={User}/>
                    <PrivateRoute exact path='/me/update/:id' component={UpdateMe}/>
                    <PrivateRoute exact path='/misDevices' component={galeriaDevices}/>
                    <PrivateRoute exact path='/records/:id' component={Records}/>
                    <PrivateRoute exact path='/reportTax/:id' component={ReportTax}/>
                    <PrivateRoute exact path='/reports' component={Reports}/>
                    <PrivateRoute exact path='/report/:id' component={Report}/>


                </main>
            </Router>
        )
    }
}
export default Routes;