import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import PortfolioSimulation from './components/portfolio_simulation/PortfolioSimulation';
import PortfolioLidar from './components/portfolio_lidar/PortfolioLidar';
import PortfolioSegmentation from './components/portfolio_segmentation/PortfolioSegmentation';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/portfolio/simulation" Component={PortfolioSimulation} />
        <Route path="/portfolio/lidar" Component={PortfolioLidar} />
        <Route path="/portfolio/segmentation" Component={PortfolioSegmentation} />
        <Route path="/portfolio" Component={Portfolio} />

        <Route path="/contact" Component={Contact} />
        
      </Routes>
    </Router>
  );
}

export default App;

////{<img src = {process.env.PUBLIC_URL+ "images/birb.png"} alt="Birb" className='image'/>}