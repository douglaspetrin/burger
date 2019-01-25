import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      
      <div className="App">
        
        
        <Blog />
        {/* <Layout>
        
          <BurgerBuilder />
          
        </Layout> */}
      </div>
      
    );
  }
}

export default App;


// containers -> stateful components (class)
// components -> stateless components (ex: functions)
// start a new branch 'blog'