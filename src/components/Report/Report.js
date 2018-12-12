import React, {Component} from 'react';
import './style.css';
import allReports from '../../services/allReports';

import Nav from '../Nav/Nav';


class Report extends Component{



    render(){
        return(
            <div className="bodyReport">
                <Nav/>

            </div>
        )
    }
}

export default Report;