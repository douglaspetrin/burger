import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'; 

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle 
        clicked={props.drawerToggleClicked}
        clicado={props.chamaFun}
        />
        
        <div onClick={props.click}><a href="#">MENU</a></div>
        <div onClick={props.abreFecha}><a href="#">Abre/Fecha</a></div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <ul>
                <NavigationItems />
            </ul>
        </nav>
    </header>
);
 
 
export default toolbar;