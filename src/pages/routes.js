import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalFeed from './GlobalFeed';
import Article from './Article';
import Authentication from "./Authentication";

 const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={GlobalFeed} exact />
            <Route path="/login" component={Authentication} />
            <Route path="/register" component={Authentication} />
            <Route path="/articles/:slug" component={Article} />
        </Switch>
    )
};

export default Routes;