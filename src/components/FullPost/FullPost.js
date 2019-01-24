import React, { Component } from 'react';
import classes from './FullPost.module.css';
import axios from  '../../axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate () {

        if (this.props.id) {
            if( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('/posts/' + this.props.id)
                .then(response => {
                    this.setState({loadedPost: response.data});
                });
            }
        }

    }



    deletePostHandler = () => {
            axios.delete('/posts/' + this.props.id)
            .then(response => {
                //console.log(response);

                window.location.reload(); //refresh the page
                
                
            })
        }
        

    render () {
        
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading..</p>;
        }

        if (this.state.loadedPost) {
        
            post = (
                <div className={classes.FullPost}>
                    
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    
                    <div className={classes.Edit}>
                        <button className={classes.Delete} onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }

        return post;
    }
}

export default FullPost;