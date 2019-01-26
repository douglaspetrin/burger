import React, { Component } from 'react';
import classes from './Blog.module.css';
import Posts from '../Blog/Posts/Posts';
import NewPost from './NewPost/NewPost';
import { Route, Link, withRouter } from 'react-router-dom';


class Blog extends Component {
      render () {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new-post">New Post</Link></li>
                            <li><Link to={{
                                pathname: this.props.match.url + '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'

                            }}>New Post</Link></li>
                            
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
                <Route path="/" exact component={Posts} />
                <Route path="/new-post" component={NewPost} />
            </div>
        );
    }
}

export default withRouter(Blog);