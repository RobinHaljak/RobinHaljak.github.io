// src/Docs.js
import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Portfolio.css'
import BoxWithBackground from './BoxWithbackground';

function Portfolio() {
  return (

    <div>
        <Header />
      <h1>Portfolio</h1>

      <div>
        boxes with different projects

        Semantic segmentation of MRI images using CNNs
        Large scale simulation of particles (scipy)
        LiDAR tracking and prediction (c++)
        ...

      </div>

      <div className='portfolio-boxes'>
        <div className='box-row'> 
        <BoxWithBackground
          text="Simulation"
          hoverText="N-body simulation of galactic tidal tails and Saturn’s rings"
          linkUrl="/portfolio/simulation"
          imageUrl="images/Saturn.jpg"
        />
        <BoxWithBackground
          text="Segmentation"
          hoverText="Semantic Segmentation of Kidney Tumours using Convolutional Neural Networks"
          linkUrl="/portfolio/segmentation"
          imageUrl="images/AmosMRI.png"
        />
        </div>

        <div className='box-row'> 
        <BoxWithBackground
          text="Click Me!"
          hoverText="Simulation"
          linkUrl="/portfolio/simulation"
          imageUrl="images/Saturn.jpg"
        />
        <BoxWithBackground
          text="Click Me!"
          hoverText="Simulation"
          linkUrl="/portfolio/simulation"
          imageUrl="images/Saturn.jpg"
        />
        </div>

        </div>
        
      <div/>

      <nav className="navigation">
                    <ul>
                        <li><Link to="/portfolio/simulation">Dynamic simulation</Link></li>
                        <li><Link to="#">X</Link></li>
                        <li><Link to="/portfolio/lidar">LiDAR vision</Link></li>
                        <li><Link to="/portfolio/segmentation">Segmentation</Link></li>
                    </ul>
                </nav>
    </div>

  );
}

export default Portfolio;