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
                    <Nav/>
                    <br/>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <PrivateRoute exact path='/logout' component={Logout}/>
                    <PrivateRoute exact path='/dashboard' component={Dashboard}/>
                    <PrivateRoute exact path='/addUser' component={FormUser}/>
                    <PrivateRoute exact path='/addDevice' component={FormDevice}/>
                    <PrivateRoute exact path='/profile' component={Profile}/>
                    <PrivateRoute exact path='/devices' component={Devices}/>
                    <PrivateRoute exact path='/device/:id' component={Device}/>
                </main>
            </Router>
        )
    }
}
export default Routes;