import React, { Component } from 'react'; 
 import axios from '../../../axios';
 import classes from './Posts.module.css';
 import Post from '../../../components/Post/Post';

class Posts extends Component {
    state = {
        posts: [ ]
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
            console.log(error);
            //this.setState({error: true});
        });

        
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
        console.log(id);
    } 

    render() {

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
            <section className={classes.Posts}>
                {posts}
            </section>

        );
    }
};
 
export default Posts;