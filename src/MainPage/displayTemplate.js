import React from 'react';
import './diaplayTemplate.css';

class RenderMode extends React.Component{
    constructor(){
        super();
            this.state={
                Dosage:[],
                Indication:[],
                Contraindications:[],
                Relative_Contraindication:[],
                Drug_Interaction:[]
        };
    }
render(){
    
    {this.state.Dosage = this.props.Dosage}
    {this.state.Indication = this.props.Indication}
    {this.state.Contraindications = this.props.Contraindications}
    {this.state.Relative_Contraindication = this.props.Relative_Contraindication}
    {this.state.Drug_Interaction = this.props.Drug_Interaction}
    

    return(
        <div className="type-container">
                <div>
                    <label className = "type-labels">{this.props.Medname}</label>
                    </div>
                   
                    <div>
                    {
                        this.state.Dosage.map((Dosage, index)=>{
                            return <ul className = "type-labels">{Dosage}</ul>; 
                        })
                    }
                    </div>
                   
                    <div>
                    {
                        this.state.Indication.map((Indication, index)=>{
                            return <ul className = "type-labels">{Indication}</ul>; 
                        })
                    }
                    </div>

                    <div>
                    {
                        this.state.Contraindications.map((Contraindications, index)=>{
                            return <ul className = "type-labels">{Contraindications}</ul>; 
                        })
                    }
                    </div>
                    <div>
                    {
                        this.state.Relative_Contraindication.map((Relative_Contraindication, index)=>{
                            return <ul className = "type-labels">{Relative_Contraindication}</ul>; 
                        })
                    }
                    </div>
                    <div>
                    {
                        this.state.Drug_Interaction.map((Drug_Interaction, index)=>{
                            return <ul className = "type-labels">{Drug_Interaction}</ul>; 
                        })
                    }
                    </div>
                </div>
    )
}
}

export default class DisplayInfo extends React.Component{
    state={
        type:[
            //Medname
         ["Aspirin", 
        "Paracetamol",
        ],
        //Dosage
        [
            
            ["Tablets 2mg/day 4/day", "Injections 2mg/day 4/day"],
            ["Tablets 2mg/day 4/day"],
            ...[]
        ],
        //Indications
         [
            ["hi", "ok"],
            ["yay"],
            ...[]
        ],
        //Contraindications
         [
            ["ivujr"],
            ["fhgcskjv", "gfkbdv"],
            ...[]
        ],
        //R-C
         [
            ["ivujr"],
            ["fhgcskjv", "gfkbdv"],
            ...[]
        ],
        //Drug-I
        [
            ["ivujr"],
            ["fhgcskjv", "gfkbdv"],
            ...[]
        ]
        ],
        
        

    }
   
    render(){
        let typeComponents = [];
        for(var i=0; i < this.state.type[0].length; i++ ){
            console.log(this.state.type[0].length);
            typeComponents.push(<RenderMode Medname = {this.state.type[0][i]}
                Dosage = {this.state.type[1][i]}
                Indication = {this.state.type[2][i]}
                Contraindications = {this.state.type[3][i]}
                Relative_Contraindication = {this.state.type[4][i]}
                Drug_Interaction = {this.state.type[5][i]}
                /> );
        }
        console.log(typeComponents);
        return(
            <div className="info-container">

                <div className="type-container">
                <div>
                    <label className = "type-labels1">Medname</label>
                    </div>

                    <div>
                        <label className = "type-labels1">Dosage</label>
                    </div>
                    
                    <div>
                        <label className = "type-labels1">Indication</label>
                    </div>

                    <div>
                        <label className = "type-labels1">Contraindications</label>
                    </div>
                    <div>
                        <label className = "type-labels1">Relative-Contraindication</label>
                    </div>
                    <div>
                        <label className = "type-labels1">Drug-Interaction</label>
                    </div>
                </div>
                {typeComponents}
            </div>
        )
    }
}