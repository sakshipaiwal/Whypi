import React from 'react';
import './info.css'



class RenderList extends React.Component{
    render(){
        return(
            <ul className = {this.props.suggestionListClass}>
                {this.props.suggestions.map((name, index) => {
                    let classname = this.props.suggestioneleClass;

                    if(index === this.props.activeIndex){
                        if(classname)
                            classname +=  " " + this.props.suggestionActiveClass; 
                        else
                            classname +=  this.props.suggestionActiveClass; 

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


export default class AutoSuggest extends React.Component{
    render(){
        return (
        <div className = {this.props.containerClass}>
            <RenderList suggestions = {this.props.suggestions}
                suggestionListClass = {this.props.suggestionListClass}
                suggestionActiveClass = {this.props.suggestionActiveClass}
                suggestioneleClass = {this.props.suggestioneleClass}
                activeIndex  = {this.props.activeIndex}
                />
        </div>

        )




    }




}