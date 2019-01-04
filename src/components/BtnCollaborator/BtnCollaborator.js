import React,{Component} from 'react';
import './style.css';

class BtnCollaborator extends Component{
    constructor(props){
        super(props);
        this.state = {
            colaborador:props.colaborador
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
            <React.Fragment>
                <img src={this.state.colaborador.image_url} className="imgRedondasm mr-2" alt={this.state.colaborador.name}/>
            </React.Fragment>
        )
    }
}

export default BtnCollaborator;