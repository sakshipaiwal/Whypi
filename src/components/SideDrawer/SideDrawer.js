import React from 'react';
import "./SideDrawer.css";


export default class SideDrawer extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {}
    }
    onClick(e, num){
        /// Cheking if the refs exists , cannt have the code break over this.....
        if(this.props.propRefs[num] &&this.props.propRefs[num].current){
            this.props.propRefs[num].current.scrollIntoView({
                behavior : 'smooth',
                block: 'center'
            });
        }
           // window.scrollTo(0,this.props.propRefs[num].current.offsetMid);
    }
    
    render(){
        return(
    <nav className="side-drawer">
        <ul>
            <li onClick = {(e) => this.onClick(e,0)}>Medname </li>
            <li onClick = {(e) => this.onClick(e,1)} >Dosage </li>
            <li onClick = {(e) => this.onClick(e,2)}>Indications</li>
            <li onClick = {(e) => this.onClick(e,3)}>ContraIndication</li>
            <li onClick = {(e) => this.onClick(e,4)}>Relative-ContraIndication</li>
            <li onClick = {(e) => this.onClick(e,5)}>Drug-Interaction</li>
        </ul>
    </nav>
        )

    }
}
