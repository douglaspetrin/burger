import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component {
    state = {
        showSideDrawer: false
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
            <React.Fragment>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                     
                    />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
        </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);

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