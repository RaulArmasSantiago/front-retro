import React, { Component } from 'react';
import singleDevice from '../../services/singleDevice'

class RowUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            device:props.device,
            dispositivo:"",
            typeText:"",
            typeImg:""
        }
    }

    componentDidMount(){
        console.log(this.state)
        singleDevice(this.state.device._id).then((dev) =>{
            this.setState({
                dispositivo:dev.data.data.singleDevice
            })
        })
        console.log(this.state)
        if(window.screen.availWidth <= 500){
            this.setState(
                {
                    typeText:"text-longest",
                    typeImg:"img-longest"
                }
            )
        }else{
            this.setState(
                {
                    typeText:"text-medium",
                    typeImg:"img-medium"
                }
            )
        }
    }

    addArray = (e) =>{
        let value = e.target.value
        this.props.onCheckBox(value)
    }

    render(){
        console.log(this.state)
        return(
            <tr>
                <td>
                    <div className="contenido">
                    <center>
                        <p className={this.state.typeText}><b>{this.state.dispositivo.concesion}-T</b></p>
                    </center>
                    </div>
                </td>
                <td>
                    <center>
                        <img src={this.state.dispositivo.image_url_conductor} alt="" width="50px"/>
                    </center>
                </td>
            </tr>
        )
    }
}

export default RowUser;