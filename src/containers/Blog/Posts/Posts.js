import React, { Component } from 'react'; 
import axios from '../../../axios';
import classes from './Posts.module.css';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import { Route } from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: [ ]
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return { 
                ...post,
                author: 'Doug'
            }
        });
            this.setState({posts: updatedPosts});
            //console.log(updatedPosts);    
        } )   
            .catch(error => {
            console.log(error);
            //this.setState({error: true});
        });

        
    }

    postSelectedHandler = (id) => {
        //this.setState({selectedPostId: id});
        //this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push('/posts/' + id);
//        this.props.history.push('/' + id);
        console.log(id);
    } 

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                //<Link to={'/posts/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} //now I have id in the function above
                        /> 
                        //</Link>
                        );
            });
        }

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
};
 
export default Posts;