import React, { Component } from 'react';
import classes from './Blog.module.css';
import Posts from '../Blog/Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import { Route, NavLink, Switch } from 'react-router-dom';


class Blog extends Component {
      render () {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/" 
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
                    <Route path="/" exact component={Posts} />
                    
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts/:id" component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default Blog;