import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import Area from './Area'
import StackedArea from './StackedArea'
import './App.css';

const App = () => (
  <Switch>
    <Route path='/stacked-area' component={StackedArea} />
    <Route path='/area' component={Area} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;
