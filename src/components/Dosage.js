import React from 'react';
import './info.css';

// Testing for git

class RenderMode extends React.Component{
    /*
        props are 
        1) index
        2) OnChangeDose
        3) modeName 
    */


    onChangeDose = (event) => {
        let dose = event.target.value;
        this.props.onChangeDose(dose, this.props.index);
    }
    onChangeDist = (event) => {
        let dist = event.target.value;
        this.props.onChangeDist(dist, this.props.index);
    }

    render(){
        return(
            <div className = "mode_container" >
                <div className = "mode_name">
                    <label className = "info_labels">{this.props.modeName} </label>
                </div>
                <div>
                    <input type = "number" className = "dose_input" onChange = {this.onChangeDose}/>
                </div>
                <div>
                    <input type = "number" className = "dose_input" onChange = {this.onChangeDist}/>
                </div>

                <div>


                </div>


            </div>

        )
    }

}


export default class Dosage extends React.Component{
    constructor(props){
        super(props);
        this.modes = ["Injection", "Tablet", "Capsule", "Liquid", "Syrup"];
        // Each entry is in order injection ,tablet,capsule,liquid,syrup
        this.onChangeDose = this.onChangeDose.bind(this);
        this.onChangeDist = this.onChangeDist.bind(this);
    }

    onChangeDose(value, index){
        /*
            makes changes in the dose array in the state of info.js 
        */
       this.props.onChangeDose(value,index);
    }

    onChangeDist(value, index){
        /*
            makes changes in the day_dist array in the state of info.js 
        */
        this.props.onChangeDist(value, index);
    }

    focus = () => {
        this.dosageRef.current.focus();


    }

    render(){
        let modeComponents = [];
        
        for(var i = 0 ; i < this.modes.length ; i++){
            modeComponents.push(<RenderMode modeName = {this.modes[i]}
                                onChangeDose = {this.onChangeDose}
                                onChangeDist = {this.onChangeDist}
                                index = {i}
                                key = {this.modes[i]}
                                /> );
        }
        return(
            <div className = "dose_container" ref = {this.props.containerRef}>
                
                <div className = "mode_container">
                    <div>
                    <label className = "info_labels">Mode</label>
                    </div>

                    <div>
                        <label className = "info_labels">Dosage(mg/kg/day)</label>
                    </div>
                    
                    <div>
                        <label className = "info_labels">Day dist</label>
                    </div>

                </div>                
                {modeComponents}
            </div>


        )


    }

}