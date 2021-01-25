import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalFeed from './GlobalFeed';
import Article from './Article';
import Authentication from "./Authentication";
import TagFeed from './TagFeed'
import YourFeed from './YourFeed'

 const Routes = () => {
   return (
     <Switch>
       <Route path="/" component={GlobalFeed} exact />
       <Route path="/feed" component={YourFeed} />
       <Route path="/tags/:slug" component={TagFeed} />
       <Route path="/login" component={Authentication} />
       <Route path="/register" component={Authentication} />
       <Route path="/articles/:slug" component={Article} />
     </Switch>
    )
};

export default Routes;