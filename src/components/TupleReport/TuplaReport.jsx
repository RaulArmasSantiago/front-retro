import React,{Component} from 'react';
import './style.css';

class TuplaReport extends Component{
    constructor(props){
        super(props);
        this.state ={
            reporte:props.reporte,
            key:props.index
        }
    }

    render(){
        return(
            <tr onClick={()=> this.props.redirect(this.state.reporte._id)}>
                <td> <img src={this.state.reporte.img_url} alt="" width="70px" height="70px" className="centered-and-cropped imgRedondaTR"/></td>
                <td>{this.state.reporte.name} {this.state.reporte.lastname}</td>
                <td>{this.state.reporte.description}</td>
                <td>{this.state.reporte.reporter}-T</td>
                
                
                
            </tr>
        )
    }

}
export default TuplaReport;