import React, {Component} from 'react';
import './style.css';
import allUsers from '../../services/allUsers';
import CardUser from '../CardUser/CardUser';
import Nav from '../Nav/Nav';

class Users extends Component{
    constructor(props){
        super(props);
        this.state = {users:''}
    }

    componentDidMount(){
        allUsers().then((resp) => {
            console.log(resp.data)
            this.setState(
                {users:resp.data.data.allUsers}
            )
        }).catch((err) => {
            console.log(err)
        })
    }

    redirect = (id) => {
        this.props.history.push(`/user/${id}`)
    }

    renderUsers = () => {
        console.log(this.state)
        if(this.state.users !== ""){
            let users = this.state.users.map((user,key) => {
                return(
                    <CardUser user={user} redirect={this.redirect}/>
                )
            })
            return users;
        }else{
            return(
                <div></div>
            )
        }
    }

    render(){
        return(
            <div className="bodyProfile">
                <Nav/>
                <br/>
                <div className="container">
                <div className="row justify-content-center container">
                    <div className="text-center col-md-12">
                    <p>
                        <h3 className="user-title text-center">Todos los usuarios</h3>
                    </p>
                    </div>
                    <div className="row">
                        {this.renderUsers()}
                    </div>
                </div>
                </div>
                
            </div>
        )
    }
}

export default Users;