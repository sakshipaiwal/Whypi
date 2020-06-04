import React from 'react';
import Toolbar from '../components/Toolbar/Toolbar';
import MainPage from './infoMainPage';
import './App2.css';

export default class App2 extends React.Component{
  
  
  
    render(){ 

  
        return (
            <div className="app2-wrapper">
               <Toolbar/>
            <MainPage/>
            </div>
           
          );
  
    }
}