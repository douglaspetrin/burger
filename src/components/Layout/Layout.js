import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState ({showSideDrawer: false});
    }

    sideDrawerOpenHandler = () => {
        this.setState ({showSideDrawer: true});
    }

    sideDrawerToggleHandlerOld = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer})
    }


    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer};
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar 
                click={this.sideDrawerOpenHandler} 
                drawerToggleClicked={this.sideDrawerOpenHandler}
                chamaFun={this.sideDrawerOpenHandler}
                abreFecha={this.sideDrawerToggleHandler}
                vai={this.sideDrawerToggleHandler}
                />
                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    sair={this.sideDrawerClosedHandler}
                    abreFecha={this.sideDrawerToggleHandlerOld}
                    
                    
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
        </Aux>
        );
    }
}

export default Layout;

/*
Layout.js
                <Toolbar 
                click={this.sideDrawerOpenHandler}/>

                Call the function sideDrawerOpenHandler
--

Toolbar.js

                <div onClick={props.click}>MENU</div>
                Pass the props click to the Toolbar component which is inside the Layout comp.




*/