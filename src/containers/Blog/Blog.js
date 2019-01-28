import React, { Component } from 'react';
import classes from './Blog.module.css';
import Posts from '../Blog/Posts/Posts';
import NewPost from './NewPost/NewPost';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


class Blog extends Component {
    state = {
        auth: false
    }
      render () {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/posts/" 
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: 'blue',
                                textDecoration: 'underline'}}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'

                            }} exact>New Post</NavLink></li>
                            
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
                
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}    
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" to="/posts"/>
                    {/* <Route path="/:id" exact component={FullPost} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;