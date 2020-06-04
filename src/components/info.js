import React from 'react';
import './info.css';
import scrollToComponent from 'react-scroll-to-component';
import QuoraTemplate from './Quota_tomplate';
import Dosage from "./Dosage";
import SideDrawer from './SideDrawer/SideDrawer';



export default class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {medNames : [],
            indications : [] , contraIndications : [] , relativeContra : [] , doses : ["","","","",""] , day_dist : ["","","","",""],
            drugInteraction : [] ,
        };
        // refs for scrolling .... ie each ref is attached to the containers of dosage , name , indications etc...
        this.containerRefs = [React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef()];
        

        this.dosageRef = React.createRef();
        this.addMedname = this.addMedname.bind(this);
        this.removeMedname = this.removeMedname.bind(this);
        this.addMednameComment = this.addMednameComment.bind(this);

        this.addContraindication = this.addContraindication.bind(this);
        this.removeContraindication = this.removeContraindication.bind(this);
        this.addIndication = this.addIndication.bind(this);
        this.removeIndication = this.removeIndication.bind(this);
        this.addContraindicationComment = this.addContraindicationComment.bind(this);
        this.addIndicationComment = this.addIndicationComment.bind(this);
        this.addRelativecontraComment = this.addRelativecontraComment.bind(this);
        this.addRelativecontra = this.addRelativecontra.bind(this);
        this.removeRelativecontra = this.removeRelativecontra.bind(this);
        this.addDruginteraction = this.addDruginteraction.bind(this);
        this.removeDruginteraction = this.removeDruginteraction.bind(this);
        this.addDruginteractionComment = this.addDruginteractionComment.bind(this);
        this.onChangeDose = this.onChangeDose.bind(this);
        this.onChangeDist = this.onChangeDist.bind(this);
    }

    addSomething(){
        console.log("yesssssss");
    }


    addContraindication(contraIndication){
        this.setState({contraIndications : this.state.contraIndications.concat({value: contraIndication.toLowerCase() , comment : ""})});
    }
    removeContraindication(contraindication){ 
        this.setState({contraIndications : this.state.contraIndications.filter(oneItem => oneItem.value !== contraindication)});
    }

    addRelativecontra(relativecontra){
        this.setState({relativeContra : this.state.relativeContra.concat({value: relativecontra.toLowerCase() , comment : ""})});
    }
    removeRelativecontra(relativecontra){ 
        this.setState({relativeContra : this.state.relativeContra.filter(oneItem => oneItem.value !== relativecontra)});
    }


    addIndication(indication){
        this.setState({indications : this.state.indications.concat({value:indication.toLowerCase() , comment : ""})});
    }
    removeIndication(indication){
        this.setState({indications : this.state.indications.filter(oneItem => oneItem.value !== indication)});
    }
   
    addDruginteraction(interaction){
        this.setState({drugInteraction : this.state.drugInteraction.concat({value:interaction.toLowerCase() , comment : ""})});
    }
    removeDruginteraction(interaction){
        this.setState({drugInteraction : this.state.drugInteraction.filter(oneItem => oneItem.value !== interaction)});
    }
    addMedname(name){
        this.setState({medNames : this.state.medNames.concat({value:name.toLowerCase() , comment : ""})});
    }
    removeMedname(name){
        this.setState({medNames : this.state.medNames.filter(oneItem => oneItem.value !== name)});
    }
    
    
    
    addContraindicationComment(contraindication , comment){

        this.setState({contraIndication : this.state.contraIndications.map(item => {
            if(item.value === contraindication){
                item.comment = comment;
            }
            return item;
        })});
    }
    addIndicationComment(indication , comment){

        this.setState({indication : this.state.indications.map(item => {
            if(item.value === indication){
                item.comment = comment;
            }
            return item;
        })});
    }
    addRelativecontraComment(relativecontra , comment){
        this.setState({relativeContra : this.state.relativeContra.map(item => {
            if(item.value === relativecontra){
                item.comment = comment;
            }
            return item;
        })});
    }
    addDruginteractionComment(interaction , comment){
        this.setState({drugInteraction : this.state.drugInteraction.map(item => {
            if(item.value === interaction){
                item.comment = comment;
            }
            return item;
        })});
    }
    addMednameComment(name , comment){
        this.setState({medNames : this.state.medNames.map(item => {
            if(item.value === name){
                item.comment = comment;
            }
            return item;
        })});
    }


    onChangeDose(value, index){
        this.setState({doses : this.state.doses.map((dsg, ind) => {
            if(ind === index)
                return value;
            return dsg;
        })});
    }
    onChangeDist(value, index){
        this.setState({day_dist : this.state.day_dist.map((dis, ind) => {
            if(ind === index)
                return value;
            return dis;
        })});

    }

   
    submit(){
        if(this.state.medNames.length>0  && this.state.doses.length>0 && this.state.day_dist.length>0)
        console.log(this.state);
        else 
        console.log("error");
    }



    render(){
        return(
            <>
            
            <SideDrawer propRefs = {this.containerRefs.filter((ele) => true)}/>

            <div className = "wrapper">
             <QuoraTemplate
                containerClass = "medname_container"
                labelClass = "info_labels"
                inputClass = "indication_input"
                label = "Mednames"
                listClass = "quora_items_container"
                listeleClass = "info_indication_list_ele"
                crossClass = "quora_cross"
                plusClass = "quora_plus"
                addItem = {this.addMedname}
                removeItem = {this.removeMedname}
                itemsArray = {this.state.medNames}
                showSuggestions = {true}
                suggestionListClass = "info_indication_suggestions"
                suggestioneleClass = "info_indication_suggestions_ele"
                suggestionActiveClass =  "info_indication_active"
                suggestionUrl = "http://localhost:5000/suggest/meds/"
                addComment = {this.addMednameComment}
                containerRef = {this.containerRefs[0]}
            />
           <Dosage  onChangeDose = {this.onChangeDose}
                    onChangeDist = {this.onChangeDist}
                    containerRef = {this.containerRefs[1]}
                    test = {"Hello"}    
                    />

            <QuoraTemplate
                containerClass = "indication_container"
                labelClass = "info_labels"
                inputClass = "indication_input"
                label = "Indications"
                listClass = "quora_items_container"
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
                suggestionUrl = "http://localhost:5000/suggest/meds/"
                addComment = {this.addIndicationComment}
                containerRef = {this.containerRefs[2]}
            />


            <QuoraTemplate containerClass = "contraindication_container"
                labelClass = "info_labels"
                inputClass = "contraindication_input"
                label = "Contra-indications"
                listClass = "quora_items_container"
                listeleClass = "info_contraindication_list_ele"
                crossClass = "quora_cross"
                plusClass = "quora_plus"
                addItem = {this.addContraindication}
                itemsArray = {this.state.contraIndications}
                removeItem = {this.removeContraindication}
                addComment = {this.addContraindicationComment}
                containerRef = {this.containerRefs[3]}
                />


            <QuoraTemplate
                containerClass = "relativecontra_container"
                labelClass = "info_labels"
                inputClass = "indication_input"
                label = "Relative-Contraindications"
                listClass = "quora_items_container"
                listeleClass = "info_indication_list_ele"
                crossClass = "quora_cross"
                plusClass = "quora_plus"
                addItem = {this.addRelativecontra}
                removeItem = {this.removeRelativecontra}
                itemsArray = {this.state.relativeContra}
                showSuggestions = {true}
                suggestionListClass = "info_indication_suggestions"
                suggestioneleClass = "info_indication_suggestions_ele"
                suggestionActiveClass =  "info_indication_active"
                suggestionUrl = "http://localhost:5000/suggest/meds/"
                addComment = {this.addRelativecontraComment}
                containerRef = {this.containerRefs[4]}
            />

            <QuoraTemplate
                containerClass = "interaction_container"
                labelClass = "info_labels"
                inputClass = "indication_input"
                label = "Drug interactions"
                listClass = "quora_items_container"
                listeleClass = "info_indication_list_ele"
                crossClass = "quora_cross"
                plusClass = "quora_plus"
                addItem = {this.addDruginteraction}
                removeItem = {this.removeDruginteraction}
                itemsArray = {this.state.drugInteraction}
                showSuggestions = {true}
                suggestionListClass = "info_indication_suggestions"
                suggestioneleClass = "info_indication_suggestions_ele"
                suggestionActiveClass =  "info_indication_active"
                suggestionUrl = "http://localhost:5000/suggest/meds/"
                addComment = {this.addDruginteractionComment}
                containerRef = {this.containerRefs[5]}
            />

        <button className="button" onClick={() => {this.submit()}}>SUBMIT</button>
        </div>

        </>
        )



    }


}