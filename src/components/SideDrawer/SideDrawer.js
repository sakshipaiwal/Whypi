import React from 'react';
import "./SideDrawer.css";

const sideDrawer = props => (
    <nav className="side-drawer">
        <ul>
            <li><a href='/'>Medname</a></li>
            <li>
                <a href="/">Dosage</a>
            </li>
            <li><a href='/'>Indications</a></li>
            <li><a href='/'>Contraindications</a></li>
            <li><a href='/'>Relative- contraindications</a></li>
            <li><a href='/'>Drug Interactions</a></li>
        </ul>
    </nav>
);
export default sideDrawer;