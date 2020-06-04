import React from 'react';
import './infoMainPage.css';
import DisplayInfo from './displayTemplate'

export default class MainPage extends React.Component{
    
    render(){

        return(
            <div className="MainPage-wrapper">
                 <div className="Medname">
                Medname
                </div>
                <div className="add-medname"> +Add medname</div>
                <div className="thick-line"></div>
                <div className="table">
                    <DisplayInfo/>
                </div>
           
            </div>
            
        );
    }
}