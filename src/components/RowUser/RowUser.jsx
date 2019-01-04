import React, { Component } from 'react';


class RowUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:props.user,
            typeText:"",
            typeImg:""
        }
    }

    componentDidMount(){
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

    render(){
        return(
            <tr>
                <td className="alingFoto"><img src={this.state.user.image_url} className={this.state.typeImg}/></td>
                <td>
                    <div className="contenido">
                        <p className={this.state.typeText}><b>{this.state.user.name} {this.state.user.lastname}</b></p>
                    </div>
                </td>
                <td>
                    <div className="contenido">
                        <p className={this.state.typeText}><b>{this.state.user.email}</b></p>
                    </div>
                </td>
            </tr>
        )
    }
}

export default RowUser;