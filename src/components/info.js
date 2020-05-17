import React from 'react';
import './info.css'
import axios from 'axios';
import scrollToComponent from 'react-scroll-to-component';
import QuoraTemplate from './Quota_tomplate'

class RenderList extends React.Component{
    render(){
        return(
            <ul className = "info_name_suggestions">
                {this.props.names.map((name, index) => {
                    let classname = "info_name_list_ele";
                    if(index === this.props.activeindex){
                       classname += " info_name_active" 
                    }
                    return (
                        
                        <li className = {classname} key = {name}>
                            {name}
                        </li>
                    )
                })
                }
            </ul>
        )
    }
}










export default class Medname extends React.Component{
    constructor(props){
        super(props);
        this.state = {medname : "", NameactiveSuggestion : 0, nameSuggestions : [] , nameShowSuggestions : false,
            indications : [] , contraIndication : [] 
        };

        this.dosageRef = React.createRef();
        this.OnNameChange = this.OnNameChange.bind(this);
        this.onNameKeyDown = this.onNameKeyDown.bind(this);

        this.addContraindication = this.addContraindication.bind(this);
        this.removeContraindication = this.removeContraindication.bind(this);
        this.addIndication = this.addIndication.bind(this);
        this.removeIndication = this.removeIndication.bind(this);
    }


    addContraindication(contraIndication){
        this.setState({contraIndication : this.state.contraIndication.concat(contraIndication.toLowerCase())});
    }
    removeContraindication(contraindication){
        this.setState({contraIndication : this.state.contraIndication.filter(oneItem => oneItem !== contraindication)});
    }

    addIndication(indication){
        this.setState({indications : this.state.indications.concat(indication.toLowerCase()),
        });
    }
    removeIndication(indication){
        this.setState({indications : this.state.indications.filter(oneItem => oneItem !== indication)});
    }
    addContraindicationComment(contraindication){
        this.setState()



    }





    OnNameChange(event){
        const userInput = event.target.value;

        axios.get("http://localhost:5000/suggest_meds/med/" + userInput.toLowerCase())
        .then(data => {
            this.setState({
                nameSuggestions : data.data,
            });
            
        })
        .catch(err => console.log(err));

        this.setState({
            NameactiveSuggestion : 0,
            nameShowSuggestions : true,
            medname : userInput
        });

    }


    onNameKeyDown (e) {
        let keynumber = e.keyCode;
        if(this.state.nameSuggestions.length <= 0){
            if(keynumber === 13){
            this.setState({
                nameShowSuggestions : false,
                nameSuggestions : []
            })

            this.dosageRef.current.focus();
            }
            return;
        }
       
        if(keynumber === 13){
            // User has pressed enter
           
            let selected_name =this.state.nameSuggestions[this.state.NameactiveSuggestion]; 
            this.setState({
                medname : selected_name,
                nameSuggestions : [],
                nameShowSuggestions : false
            });
            
            this.dosageRef.current.focus();
            scrollToComponent(this.dosageRef.current);
        }

        else if(keynumber === 38){
            // User has pressed up arrow
            if(this.state.NameactiveSuggestion === 0){
                return;
            }
            this.setState({
                NameactiveSuggestion : this.state.NameactiveSuggestion - 1
            })
        }

        else if(keynumber === 40){
            // User has pressed down key
           
            if(this.state.NameactiveSuggestion === this.state.nameSuggestions.length - 1){
                return;
            }
            this.setState({
                NameactiveSuggestion : this.state.NameactiveSuggestion + 1
            })

        }

    };





    render(){
        return(
            <>
            <div className = "medname_container">
                <label className= "info_labels">Medname</label>
                <br/>
                <input className = "medname_input" type = "text" value = {this.state.medname} onChange = {this.OnNameChange} onKeyDown = {this.onNameKeyDown} onBlur = {() => {this.setState({nameShowSuggestions:false})}}/>
                {(this.state.nameShowSuggestions) && 
                      <RenderList names = {this.state.nameSuggestions} activeindex = {this.state.NameactiveSuggestion} />
                
                }

            </div>
            
            <div className = "dose_container">
                <label className = "info_labels">Dosage (general in mg/Kg/Day)</label>
                <br/>
                <input className = "dose_input" type = "number" ref = {this.dosageRef}/>
            </div>

            <QuoraTemplate
                containerClass = "indication_container"
                labelClass = "info_labels"
                inputClass = "indication_input"
                label = "Indications"
                listClass = "info_indication_list"
                listeleClass = "info_indication_list_ele"
                crossClass = "quora_cross"
                plusClass = "quora_plus"
                addItem = {this.addIndication}
                removeItem = {this.removeIndication}
                itemsArray = {this.state.indications}
                showSuggestions = {true}
                suggestionListClass = "info_indication_suggestions"
                suggestioneleClass = "info_indication_suggestions_ele"
                suggestionActiveClass =  "info_indication_active"
                suggestionUrl = "http://localhost:5000/suggest_meds/med/"
            />


            <QuoraTemplate containerClass = "contraindication_container"
                labelClass = "info_labels"
                inputClass = "contraindication_input"
                label = "Contra-indications"
                listClass = "info_contraindication_list"
                listeleClass = "info_contraindication_list_ele"
                crossClass = "quora_cross"
                plusClass = "quora_plus"
                addItem = {this.addContraindication}
                itemsArray = {this.state.contraIndication}
                removeItem = {this.removeContraindication}
                />

        </>


        )



    }


}