import React from 'react';
 
const drawerToggle = (props) => (
    <div onClick={props.clicked}>
        MENU <span onClick={props.clicado}>Opa</span>               
    </div>
    

);
 
export default drawerToggle;