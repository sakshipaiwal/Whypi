import React from 'react';
import './info.css';
import AutoSuggest from './Autosuggest';
import axios from 'axios';

// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component handle clicks

/*
    This is a module used to render Quora tomplate (lol).
    Takes the following props 
    
    1)  containerClass = "indication_container"    (optional name of css class)
    2)  labelClass (optional name of css class)
    3)  inputClass (optional name of css class)
    4)  label   (optional name of css class)
    5)  listClass       (optional name of css class)
    6)  listeleClass    (optional name of css class)
    7)  crossClass      (optional name of css class)
    8)  showSuggestions (optional defaults to false)
    9)  suggestionUrl   (optional url of server providing the list of suggestions)
    10) suggestionListClass (optional name of css class)
    11) suggestionActiveClass (optional name of css class)
              
              
    8)  addItem         (needed , a function to be called when item is added)
    9)  removeItem      (needed , a function to be called when item is removed)
    10) itemsArray      (needed , the entered Items to be displayed on the screen)
                
*/


class RenderCommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentComment: '' };
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onChange(event){
        this.setState({currentComment: event.target.value});
    }

    onKeyDown(event){
        const keyCode = event.keyCode;

        if(keyCode === 13){
            // User wants to submit comment
            this.props.onSubmitComment(this.props.currentItem ,this.state.currentComment);
        }


    }
    
    render(){
        return(
            <div className = "comment_container">
            <label className = "info_labels">{this.props.currentItem + " --add comment"} </label>
            <br/>
            <input className = "commentbox" type = "text" onChange = {this.onChange} onKeyDown = {this.onKeyDown}/>
            </div>
        
        )




    }
    



}


class RenderList extends React.Component{
    /*
        props are 
        1) items : it is an array of objects , each object has [value : "something", comment : "something"]
        2) onPressPlus 
        3) deleteItem
        4) plusClass
        5) listeleClass 
        6) crossclass

        basically renders a list of items in the quora style preferably in a flex type container. 
        

    */

    render(){
        return(
        <ul className = {this.props.listClass}>
            {this.props.items.map(item => {
                return(
                
                <li className = {this.props.listeleClass} key = {item.value} >
                        <span className = {this.props.plusClass} onClick = {() => this.props.onPressPlus(item.value)}>+</span> {item.value} <span className = {this.props.crossClass} onClick = {() => this.props.deleteItem(item.value)}>x</span>
                </li>
                )

            })}
        </ul>

        )

    }
}







export default class Quoratemplate extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentItem :"" , suggestions : [], activeIndex : 0 , showSuggestions : false , showCommentBox : false, suggestionItem : ""};
        this.onChange = this.onChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onPressPlus = this.onPressPlus.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        

    
    }
    componentDidMount() {
        // Adding event  listener for click, so collapse the suggestions bar....
        document.addEventListener('mousedown', this.handleClickOutside);
        
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = e => {
        // If the click is outside the component , we want to collapse the suggestion bar
        if(this.props.containerRef && !this.props.containerRef.current.contains(e.target)){
            this.setState({suggestions : [] , showSuggestions : false});
        }
    }

    deleteItem(item){
        this.props.removeItem(item);
    }
    onChange(event){
        /// Only use server if suggestionUrl has been provided
        const userInput = event.target.value;
        if(userInput.length > 0 &&  this.props.suggestionUrl){
            axios.get(this.props.suggestionUrl + userInput.toLowerCase())
            .then(data => {
                this.setState({
                    suggestions : data.data["results"],
                });
                
            })
            .catch(err => console.log(err));
    
            this.setState({
                activeIndex : 0,
                showSuggestions : true,
            });


        }

        this.setState({currentItem : userInput});


    }

    onPressPlus(item){
        this.setState({showCommentBox : true , suggestionItem : item});

    }
    onSubmitComment(item , comment){
        this.props.addComment(item , comment);
        this.setState({showCommentBox: false});





    }


    onKeyDown(e){
        // Have to handle up and down keys for selecting options as well
        let keynumber = e.keyCode;
        let exists = this.props.itemsArray.filter((item) => item.value === this.state.currentItem);
        if(exists.length > 0 || this.state.currentItem.length === 0){
            return;
        }


        // handeling no suggestions case....
        if(this.state.suggestions.length === 0 ){
            if(keynumber === 13){
                // User has pressed enter 
                this.props.addItem(this.state.currentItem);
                this.setState({
                    currentItem : ""
                });
            }

            return;
        }


        // In case of Suggestions....
        if(keynumber === 13){
            // User has pressed enter 
            if(this.state.activeIndex >= 0 && this.state.activeIndex < this.state.suggestions.length){
                // handeling duplicate values , just return if there is one
                exists = this.props.itemsArray.filter((item) => item.value === this.state.suggestions[this.state.activeIndex]);
                if(exists.length >= 1){
                    return;
                }
                this.props.addItem(this.state.suggestions[this.state.activeIndex]);

            }
            else
                this.props.addItem(this.state.currentItem);
            this.setState({
                currentItem : "",
                activeIndex : 0,
                showSuggestions : false

            });
        }

        else if(keynumber === 38){
            // User has pressed up arrow
            if(this.state.activeIndex === 0){
                return;
            }
            this.setState({
                activeIndex : this.state.activeIndex - 1
            })
        }


        else if(keynumber === 40){
            // User has pressed down key
            if(this.state.activeIndex === this.state.suggestions.length - 1){
                return;
            }
            this.setState({
                activeIndex : this.state.activeIndex + 1
            })

        }
        
    }


    render(){
        return (
        <div className = {this.props.containerClass} ref = {this.props.containerRef} onClick = {this.handleClickOutside}>
            
            {this.state.showCommentBox === false && 
            <>
            <label className= {this.props.labelClass}>{this.props.label}</label>
            <br/>
            <input className = {this.props.inputClass}
                type = "text"
                value = {this.state.currentItem}    
                onChange = {this.onChange}
                onKeyDown = {this.onKeyDown}/>
                
            </>
            }
            
            {(this.props.showSuggestions && this.state.showSuggestions && !this.state.showCommentBox) && <AutoSuggest 
                suggestions = {this.state.suggestions}
                suggestionListClass = {this.props.suggestionListClass}
                suggestionActiveClass = {this.props.suggestionActiveClass}
                suggestioneleClass = {this.props.suggestioneleClass}
                activeIndex = {this.state.activeIndex}
             
             />}

            {this.state.showCommentBox && <RenderCommentBox  onSubmitComment = {this.onSubmitComment} currentItem = {this.state.suggestionItem}/>}
            
            {this.state.showCommentBox === false && <RenderList items = {this.props.itemsArray}
                deleteItem = {this.deleteItem}
                listClass = {this.props.listClass}
                listeleClass = {this.props.listeleClass}
                crossClass = {this.props.crossClass}
                plusClass = {this.props.plusClass}
                onPressPlus = {this.onPressPlus}
                />
             }
            
        </div>

        )

    }


}