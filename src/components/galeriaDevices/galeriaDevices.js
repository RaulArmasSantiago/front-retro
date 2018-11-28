import React, {Component} from 'react';
import './style.css';
import me from '../../services/me';
import singleDevice from '../../services/singleDevice';
import device from '../Device/Device';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';


class galeriaDevices extends Component{
    constructor(props){
        super(props)
        this.state = {
            concesion:"",
            concesiones:[],
            device:"",
            user:""

        }
    }

    componentDidMount(){
        me().then((user)=> {
            this.setState({user:user.data.data.me})
            this.setState({concesiones:this.state.user.devices})
        })
        
    }

    createSelecter = (data,name) => {
        let option = data.map((option) => {
            return(
                <option value={option._id}>{option.concesion}</option>
            )
        })
        return(
            <select name={name} id={name} value={this.state[name]} onChange={this.onChangeInput} className="form-control">
                {option}
            </select>
        )
    }
    
    onChangeInput = (e)=>{
        let name = e.target.name 
        let value = e.target.value 
        this.setState(
            {[name]:value}
        )
    }

    render(){
        console.log(this.state)
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        {this.createSelecter(this.state.concesiones,"concesion")}
                        {this.renderDevice}
                    </div>
                </div>
            </div>
        )
    }
}

export default galeriaDevices;