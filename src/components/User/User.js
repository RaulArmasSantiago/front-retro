import React, {Component} from 'react';
import './style.css';
import singleUser from '../../services/singleUser';

class User extends Component{

    constructor(props){
        super(props);
        this.state = {
            id:props.match.params.id,
            user:""
        }
    }

    componentDidMount(){
        singleUser(this.state.id).then((user) => {
            console.log(user.data.data.singleUser)
            this.setState({user:user.data.data.singleUser})
        })
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default User;