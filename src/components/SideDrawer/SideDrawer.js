import React from 'react';
import "./SideDrawer.css";


export default class SideDrawer extends React.Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            names: [
                {name: "M"},
                {name: "D"},
                {name: "I"},
                {name: "C"},
                {name: "R-C"},
                {name: "D-I"}
            ]
        }
    }
    testIn = () => {
        this.setState({
            names: [
                {name: "Medical"},
                {name: "Dosage"},
                {name: "Indication"},
                {name: "Contraindication"},
                {name: "Relative Contraindications"},
                {name: "Drug Interaction"}
            ]
        })
    }

    testOut = () => {
        this.setState({
            names: [
                {name: "M"},
                {name: "D"},
                {name: "I"},
                {name: "C"},
                {name: "R-C"},
                {name: "D-I"}
            ]
        })
    
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
    <nav className="side-drawer" onMouseOver={this.testIn} onMouseOut={this.testOut}>
        <ul>
            <li onClick = {(e) => this.onClick(e,0)}>{this.state.names[0].name} </li>
            <li onClick = {(e) => this.onClick(e,1)} >{this.state.names[1].name}</li>
            <li onClick = {(e) => this.onClick(e,2)}>{this.state.names[2].name}</li>
            <li onClick = {(e) => this.onClick(e,3)}>{this.state.names[3].name}</li>
            <li onClick = {(e) => this.onClick(e,4)}>{this.state.names[4].name}</li>
            <li onClick = {(e) => this.onClick(e,5)}>{this.state.names[5].name}</li>
        </ul>
    </nav>
        )

    }
}
