import React, { Component } from 'react'; 
 import axios from '../../../axios';
 import classes from './Posts.module.css';
 import Post from '../../../components/Post/Post';
 import { Link } from 'react-router-dom';

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
        this.setState({selectedPostId: id});
        console.log(id);
    } 

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                <Link to={'/' + post.id} key={post.id}>
                    <Post
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} //now I have id in the function above
                        /> </Link>);
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