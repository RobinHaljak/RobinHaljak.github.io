// src/Docs.js
import React, { useEffect } from 'react';
import Header from '../Header';
import PortfolioButton from '../PortfolioButton';
import './PortfolioSimulation.css'

import katex from 'katex'; // Import the katex function
import 'katex/dist/katex.min.css'; // Import the KaTeX CSS


function PortfolioSimulation() {

  useEffect(() => {
    // Render the equation using KaTeX
    katex.render('\\frac{d^2 \\mathbf{r_i}}{dt^2} = -G \\sum^{N}_{j=0,i\\neq j} \\frac{M_j}{|{\\mathbf{r_{ij}}}|^2} \\mathbf{\\hat{r_{ij}}}', document.getElementById('equation1'));
  }, []);

  return (
    <div>

    
      <Header />
    
      <div className='portfolio-contents'>
        <div className='portfolio-contents-topbar'>
          <PortfolioButton />
          <h1>N-body simulation of galactic tidal tails and Saturn’s rings</h1>
        </div>

        <div className='portfolio-contents-main'>
          <div>
            The Newtonian N-body problem has a unique deterministic solution to its equations of motion. For N bodies interacting with each other gravitationally, the equations of motion are:
            <span id="equation1"></span> {/* This is where the equation will be rendered */}
            <p>Direct simulation of the N-body problem requires integration of the body’s equations of motion. This is the most computationally expensive method, but it has the highest accuracy.[6] The accuracy of solving the equations of motion depends on the chosen integration method.</p>
            <p>N-body dynamics is sensitive to initial condition, nearly identical initial conditions lead to diverging paths in phase space, which lead to notable changes in the final configuration. Numerical error in the initial condition therefore leads to exponential divergence from the deterministic solution. It has however been shown that simulations produce ensemble averages which are still predictable and accurate.[2][14]</p>
            <p>The time-complexity of solving the full N-body problem directly is 𝑂(𝑁2) from calculating the relative distance matrix of all the bodies. If only 𝑀 bodies are massive (exert a gravitational force on other bodies) the time-complexity reduces to 𝑂(𝑀𝑁).</p>
            <p>Due to the 𝑟−2 dependence of the gravitational force on distance, it is in some applications valid to model the interaction accurately only between nearby particles. In this case tree-based methods of partitioning the spatial data can produce 𝑂(𝑁𝑙𝑜𝑔(𝑁)) (and possibly even 𝑂(𝑁)) time-complexity.[6][14] One such algorithm TreePM considers short range direct interactions and long range particle mesh interactions.[1]</p>
            <p>Though these tree-based methods have lower time-complexity than the direct method, they have higher overhead than simple 𝑂(𝑁2) solvers and can lead to slower execution if high precision is required. [14]</p>
            <p>Efficient integration methods use adaptive timesteps between evaluation of the forces, taking more closely spaced steps in time when the changes in the system are faster (e.g., close encounter of two massive bodies). Through parallelisation and each body having its own time-step, the efficiency can be further improved. [5]</p>
            <p></p>
            <p>A direct N-body problem simulator was created with the goal of simulating the creation of galactic tidal tails and simulating the resonant effects leading to the creation of structures within Saturn’s rings. It is based on the scipy.integrate.solve_ivp method, which numerically solves a system of coupled ODEs given an initial condition. The equations of motion for 𝑁 particles (equation 1) were rewritten as 6𝑁 coupled ODEs (corresponding to 6𝑁 coordinates in phase space) by:</p>
            <p>scipy.integrate.solve_ivp was chosen since it allows for simple control of the accuracy of the integrator and implements adaptive time steps. [13] The DOP853 8-th order Runge-Kutta integrator was used.</p>
            <p>Quick nearby neighbour search was implemented using the scipy.spatial.kdtree method, which is an implementation of the k-d tree data structure. The k-d tree is a binary tree, where each node corresponds to a hyperplane (perpendicular to one axis) that partitions the space into two halves. The tree can then be traversed to efficiently find the nearest neighbours of each point. The creation of the k-d tree has time-complexity 𝑂(𝑁𝑙𝑜𝑔(𝑁)). The nearby neighbour search was used in the implementation of viscosity and self-gravity of the particles.</p>
            <p>Vectorisation (using NumPy) was implemented where beneficial – most importantly in calculating the inverse distance matrix. [9]</p>
            <p>Plummer softening of the form: 𝑑2𝒓𝑖𝑑𝑡2=−𝐺Σ𝑀𝑗|𝒓𝑖𝑗|2+𝑎2𝑁𝑗=0,𝑖≠𝑗𝒓̂𝑖𝑗 (3) was used to avoid the divergence of the force (and substantial decrease of the timestep and therefore simulation performance) near particles. [5]</p>
          </div>
        </div>
        
        
        
      </div>
    </div>
  );
}

export default PortfolioSimulation;