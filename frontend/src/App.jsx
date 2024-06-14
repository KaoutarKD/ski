// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SubjectPage from './components/SubjectPage';
import UserProfile from './components/UserProfile';
import Home from './components/home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/s/:subject" component={SubjectPage} />
        <Route path="/user/profile" component={UserProfile} />
        <Route path="/admin" component={AdminPanel} />
        {/* Autres routes ici */}
      </Switch>
    </Router>
  );
};

export default App;
