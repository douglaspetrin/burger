import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <div className="App">        
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


// containers -> stateful components (class)
// components -> stateless components (ex: functions)
// start a new branch 'blog'


{/* <section>
<FullPost 
id={this.state.selectedPostId}
title={this.state.selectedPostId}
/>
</section>
<section>
<NewPost />
</section> */}