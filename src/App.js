import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Infopage from './components/info';
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Toolbar from './components/Toolbar/Toolbar';


export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {Drugname :"", Dosage : "" , indications : [] ,page : 1};
  }




  render(){ 
    // <Route exact path = "/" render = {props => <MedInfoPage {...props} />}/>
//      <Route exact path = "/indications" render = {props => <Indication {...props} />}/>

      return (
        <div className = "app_wrapper"> 
        
        <Infopage {...this.props} />
        <Toolbar/>
        <SideDrawer/>
        
        </div>
        
        )
  
   


  }



};