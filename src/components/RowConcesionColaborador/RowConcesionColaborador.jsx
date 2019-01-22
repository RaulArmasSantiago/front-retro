import React, { Component } from 'react';


class RowUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            device:props.device,
            typeText:"",
            typeImg:""
        }
    }

    componentDidMount(){
        console.log(this.props)
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
        return(
            <tr>
                <td>
                    <div className="contenido">
                        <p className={this.state.typeText}><b>{this.state.device.concesion}-T</b></p>
                    </div>
                </td>
                <td>
                    <img src={this.state.device.image_conductor} alt=""/>
                </td>
            </tr>
        )
    }
}

export default RowUser;