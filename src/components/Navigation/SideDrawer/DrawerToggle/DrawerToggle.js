import React from 'react';
import Aux from '../../../../hoc/Aux';
 
const drawerToggle = (props) => (
    <Aux>
        <div onClick={props.clicked}>
            MENU 
            <span onClick={props.clicado}>Opa</span>
                        
        </div>
        <br /><span onClick={props.newToggleHandler}>Novo</span>   
    </Aux>
    

);
 
export default drawerToggle;