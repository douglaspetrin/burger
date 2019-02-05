import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from '../NavigationItems/NavigationItems.module.css';
 
const navigationItems = (props) => {
    return (
        <div>
        <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact >Burger Builder</NavigationItem>
    
    { props.isAuthenticated ? 
    <NavigationItem link="/orders">Orders</NavigationItem> 
    : null }

    { props.isAuthenticated 
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authenticate</NavigationItem>
    }
    </ul>
    </div>
    );
};

        
 
export default navigationItems;