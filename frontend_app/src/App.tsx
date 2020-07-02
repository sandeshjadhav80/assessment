import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from './container/home/pages/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';

const App = () => {
  return (
    <HashRouter>
        <Route component={Home}       path="/" exact/>               
        <Route component={About}      path="/about"/>                
        <Route component={Contact}    path="/Contact"/>
    </HashRouter>
  );
}

export default App;
