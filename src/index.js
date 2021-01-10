import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";

import Routes from './pages/routes';
import TopBar from './components/TopBar';
import {CurrentUserProvider} from "./context/currentUser";
import CurrentUserChecker from "./components/СurrentUserChecker";

const App = () => {
    return (
        <CurrentUserProvider>
            <CurrentUserChecker>
                <Router>
                    <TopBar />
                    <Routes />
                </Router>
            </CurrentUserChecker>
        </CurrentUserProvider>
    )
};

ReactDOM.render(<App />,
  document.getElementById("root")
);
