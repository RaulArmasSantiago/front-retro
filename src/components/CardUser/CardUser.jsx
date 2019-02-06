import React, {Component} from 'react';

class CardUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:props.user
        }
    }

    render(){
        console.log(this.state.device)
        return (
            
            <div className="col-sm-12 col-md-6 col-lg-4" style={{width: "14rem;"}}>
            <div className="card">
                <div className="card-header bg-dark text-white"><h5 className="card-title" onClick={() => this.props.redirect(this.state.user._id)}>{this.state.user.name} {this.state.user.lastname}</h5></div>
                <div className="card-body bg-retro text-white">
                        

                </div>
                <div className="card-footer bg-warning">
                    <button className="btn btn-dark" onClick={() => this.props.redirect(this.state.user._id)}> Ver usuario</button>
                </div>
            </div>
            <br/>
            </div>
        )
    }
}

export default CardUser;