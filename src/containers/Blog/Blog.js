import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.module.css';
import axios from '../../axios';


class Blog extends Component {
    state = {
        posts: [ ],
        selectedPostId: null,
        error: false
    }
    

    componentDidMount() {
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
            //console.log(error);
            this.setState({error: true});
        });

        
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
        console.log(id);
    } 


    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post 
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} //now I have id in the function above
                        />
            });
        } 

        return (
            <div>
                <section className={classes.Posts}>
                   {posts}
                </section>
                <section>
                    <FullPost 
                    id={this.state.selectedPostId}
                    title={this.state.selectedPostId}
                    />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;