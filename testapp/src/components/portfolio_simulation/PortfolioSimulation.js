// src/Docs.js
import React, { useEffect } from 'react';
import Header from '../Header';
import PortfolioButton from '../PortfolioButton';
import Bibliography from '../Bibliography';
import CodeBlock from '../CodeBlock';
import './PortfolioSimulation.css'


import katex from 'katex'; // Import the katex function
import 'katex/dist/katex.min.css'; // Import the KaTeX CSS


function PortfolioSimulation() {


  
    const references = [
      {
        title: 'Sample Reference 1',
        author: 'John Doe',
        year: 2023,
        link: 'https://example.com/reference1',
      },
      {
        title: 'Sample Reference 2',
        author: 'Jane Smith',
        year: 2023,
        link: 'https://example.com/reference2',
      },
      // Add more references as needed
    ];

    const nearestNeighbourCode = `
    def nearest_neighbours(y,N,M,neardist):
    """ Finds nearby particles (within radius neardist) for all simulated particles.
    Nearest neighbour search is implemented using k-d trees.

    Parameters:
        y (list[float]): positions and velocities of particles for which velocity and acceleration 
            will be evaluated. Given in the format:
            [x_1,x_2,...,x_N,y_1,...,y_N,z_1,..,z_N,vx_1,...,vx_N,vy_1,...,vy_N,vz_1,...,vz_N].
        N (int): number of particles in the simulation.
        M (int): number of massive particles in the simulation.
        neardist (float): distance within which two particles are considered close to each other for the 
            purposes of viscosity momentum exchange and self-gravity interactions.
    
    Returns:
        neighbour_list (list[list[int]]): List of nearby neighbour pairs. neighbour_list[i] is the list of
            indices of particles that are within neardist of the i-th particle
        kdtree (KDTree): KDTree of all particles positions.

    """

    # Array of lightweight particle position vectors.
    loc = np.array([y[M:N],y[N+M:2*N],y[2*N+M:3*N]]).T 

    # Creates k-d tree.
    kdtree = spatial.KDTree(loc) 

    # Finds all neighbours to points within neardist of a point for all points, returns list of indices for each particles.
    neighbour_list = kdtree.query_ball_tree(kdtree,neardist,p = 2) 

    return neighbour_list, kdtree
  `;
  
  
  const simulationCode = `solution = integrate.solve_ivp(
    fun = derivatives, #Function to integrate
    t_span=(0,timespan), #Time span of the simulation
    y0= init_list, #Initial positions and velocities of the simulatted bodies

    #Arguments passed to derivatives()
    args=(N_masses,G,timespan,mass_light,viscosity,
    self_gravity,neardist,p_exchange,softening,masses), 
    t_eval = np.linspace(0,timespan,n_frames), # Times of simulation state evaluations 
    method = integrator, # Integrator used
    atol = atol_, # Absolute tolerance of the integrator
    rtol = rtol_ # Relative tolerance of the integrator
)`;

const derivativesCode = `def derivatives(t,y,M,G,T_total,mass_light,viscosity,self_gravity,neardist,p_exchange,softening,*masses):
"""Calculates the velocity and acceleration of all particles for steps of integrate.solve_ivp.
It includes consideration of direct gravitational effect of heavy bodies on lightweight test particles.
It also includes the option of considering viscous (collisional) effects and self-gravitational
effects between nearby lightweight test particles.

Vectorisation based on method used in https://medium.com/swlh/create-your-own-n-body-simulation-with-python-f417234885e9

Parameters:
    t (float): time of evaluation of velocity and acceleration
    y (list[float]): positions and velocities of particles for which velocity and acceleration 
        will be evaluated. Given in the format:
        [x_1,x_2,...,x_N,y_1,...,y_N,z_1,..,z_N,vx_1,...,vx_N,vy_1,...,vy_N,vz_1,...,vz_N].
    M (int): number of massive particles in the simulation.
    G (float): Gravitational constant.
    T_total (float): total timespan of the simulation.
    mass_light (float): mass of particles that are not considered to exert a gravitational force on other 
        bodies, except when they are within radius neardist of eachother.
    viscosity (bool): boolean of whether viscosity (collision) effects are considered between particles 
        within neardist of eachother.
    self_gravity (bool): boolean of whether self-gravity effects are considered between lightweight 
        (do not otherwise exert a gravitational force on other bodies) particles 
        that are within neardist of eachother.
    neardist (float): distance within which two particles are considered close to each other for the 
        purposes of viscosity momentum exchange and self-gravity interactions.
    p_exchange (float): fraction of relative momentum exchanged between two particles (within neardist 
        of each other) per second
    softening (float): softening parameter (Plummer softening) applied to calculations of the gravitational force.
    *masses (list[float]): List of masses of the bodies in the format: [m_1,m_2,...m_N].

Returns:
    derivativearray (list[float]): List of velocities and accelerations calculated for step of integrator given
        state y. The list is formatted as:
        [vx_1,...,vx_N,vy_1,...,vy_N,vz_1,...,vz_N,ax_1,...,ax_N,ay_1,...,ay_N,az_1,...,az_N]

"""

masses = list(masses[0])[:M] #Masses of massive bodies.
N = int(len(y)//6) #Number of particles.

derivativearray = np.zeros(6*N)

# Assigning velocities as changes of positions. This is the trivial step for d(x_i)/dt = v_i.
derivativearray[0:N*3] = y[3*N:6*N]

#Calculating acceleration on each body from gravitational interaction with bodies that are considered massive
ax,ay,az = direct_gravity(y,N,M,G,masses,softening)

#Creates the k-d tree
if viscosity or self_gravity:
    neighbour_list, kdtree = nearest_neighbours(y,N,M,neardist)

if viscosity:
    #Calculates the viscous interactions between nearby particles and the resulting accelerations
    ax_visc,ay_visc,az_visc = viscosity_interaction(y,N,M,neighbour_list,p_exchange)

    #Adds contribution of viscous (momentum exchange) acceleration to acceleration of bodies.
    ax += ax_visc
    ay += ay_visc
    az += az_visc

if self_gravity:
    #Calculates the gravitational interactions between neighbouring particles, which are otherwise considered lightweight.
    ax_sg, ay_sg, az_sg = self_gravity_interaction(N,M,G,mass_light,neighbour_list,kdtree,softening)

    #Adds contributions of self-gravity to total acceleration
    ax += ax_sg
    ax += ay_sg
    ay += az_sg

#Adds calculated accelerations for all particle to change list
derivativearray[3*N:4*N] = ax
derivativearray[4*N:5*N] = ay
derivativearray[5*N:6*N] = az 

#Prints progress percentage
sys.stdout.write('\r') ; sys.stdout.write(str(round(t/T_total*100,3))+"%") ; sys.stdout.flush()

return derivativearray`



  useEffect(() => {
    // Render the equation using KaTeX
    katex.render('\\frac{d^2 \\mathbf{r_i}}{dt^2} = -G \\sum^{N}_{j=0,i\\neq j} \\frac{M_j}{|{\\mathbf{r_{ij}}}|^2} \\mathbf{\\hat{r_{ij}}}'
      , document.getElementById('equation1'));
  }, []);

  useEffect(() => {
    // Render the equation using KaTeX
    katex.render('\\frac{d \\mathbf{v_i}}{dt} = -G \\sum^{N}_{j=0,i\\neq j} \\frac{M_j}{|{\\mathbf{r_{ij}}}|^2} \\mathbf{\\hat{r_{ij}}}'
      , document.getElementById('equation2'));
  }, []);

  useEffect(() => {
    // Render the equation using KaTeX
    katex.render('\\frac{d \\mathbf{r_i}}{dt} = \\mathbf{v_i}'
      , document.getElementById('equation3'));
  }, []);

  useEffect(() => {
    // Render the equation using KaTeX
    katex.render('\\frac{d^2 \\mathbf{r_i}}{dt^2} = -G \\sum^{N}_{j=0,i\\neq j} \\frac{M_j}{|{\\mathbf{r_{ij}}}|^2+a^2} \\mathbf{\\hat{r_{ij}}}'
      , document.getElementById('equation4'));
  }, []);

  useEffect(() => {
    // Render the equation using KaTeX
    katex.render('\\frac{d \\mathbf{v_i}}{dt} = -G \\sum^{N_{massive}}_{j=0,i\\neq j} \\frac{M_j}{|{\\mathbf{r_{ij}}}|^2+a^2} \\mathbf{\\hat{r_{ij}}} -G \\sum_{|r_{ij}|<r_{limit}} \\frac{m_j}{|{\\mathbf{r_{ij}}}|^2+a^2} + p \\sum_{|r_{ij}|<r_{limit}} (\\mathbf{v_j} - \\mathbf{v_i})'
      , document.getElementById('equation5'));
  }, []);

  useEffect(() => {
    // Render the equation using KaTeX
    katex.render('\\frac{d \\mathbf{r_i}}{dt} = \\mathbf{v_i}'
      , document.getElementById('equation6'));
  }, []);

  return (
    <div>


      <Header />

      <div className='portfolio-contents'>
        <div className='portfolio-contents-topbar'>
          <PortfolioButton />
          <h1>N-body simulation of <strong>Galactic Tidal Tails</strong> and <strong>Saturn’s Rings</strong></h1>
          <div> </div>
        </div>

        <div className='portfolio-contents-main'>
          <div>
            Note: add code blocks demonstrating the most important parts of the implementation

            Used technologies: Python, numpy, scipy, matplotlib,
            Have a contents section at the start (on the side) and a bibliography in the end as well ofc.

            Intro before contents giving context and showing an image of a tidal tail / huygen's gap
            and explain the motivation

            Maybe I want to keep the back to portfolio button locked with the header - so you can always go back without having to scroll back up

            Add appendices in a smooth way (some pop-up thing within the text where it is relevant?)

            <h2>Theory of N-body simulation</h2>
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
            <span id="equation2"></span>
            <p></p>
            <span id="equation3"></span>
            <p>scipy.integrate.solve_ivp was chosen since it allows for simple control of the accuracy of the integrator and implements adaptive time steps. [13] The DOP853 8-th order Runge-Kutta integrator was used.</p>
            <p>Quick nearby neighbour search was implemented using the scipy.spatial.kdtree method, which is an implementation of the k-d tree data structure. The k-d tree is a binary tree, where each node corresponds to a hyperplane (perpendicular to one axis) that partitions the space into two halves. The tree can then be traversed to efficiently find the nearest neighbours of each point. The creation of the k-d tree has time-complexity 𝑂(𝑁𝑙𝑜𝑔(𝑁)). The nearby neighbour search was used in the implementation of viscosity and self-gravity of the particles.</p>
            <p>Vectorisation (using NumPy) was implemented where beneficial – most importantly in calculating the inverse distance matrix. [9]</p>
            <p>Plummer softening of the form: (3) was used to avoid the divergence of the force (and substantial decrease of the timestep and therefore simulation performance) near particles. [5]</p>
            <span id="equation4"></span>
            
            <p>The effects of resonances in Saturn’s rings were studied by considering Saturn and its satellites as heavy particles, while the ring particles were considered as light and their gravitational effects on other particles were neglected. Viscosity and self-gravity between ring particles were in some cases considered by calculating interactions between particles within a certain radius of each other.</p>
            <p>The effect of viscosity (collisions between particles) was modelled by exchanging momentum per time for particles within a certain distance of each other. The approximate magnitude of this momentum exchange was approximated in Appendix 1. The system of ODEs then becomes:</p>

            <span id="equation5"></span> 

            <span id="equation6"></span>
            <h2>Implementation</h2>




            <h2>
              Performance analysis
            </h2>
            <p>
              DOP853 is not a symplectic integrator – it does not implicitly conserve energy. The integration method was therefore checked for its accuracy and stability in two cases where the total energy is expected to be conserved:
            </p>

            <p>Particle in circular orbit:It was found that the particle had a periodic total energy variation on short timescales staying within a fractional energy error equal to the relative tolerance (𝑟𝑡𝑜𝑙). On longer time scales the total energy of the particle was found to decrease linearly with time. The decay rate of energy was found to be proportional to the relative tolerance of the integrator.The fractional decay in energy as a function of time was determined to be approximately 𝐸𝑡=0−𝐸𝑡𝐸𝑡=0≈𝑟𝑡𝑜𝑙𝑡𝑇𝑜𝑟𝑏𝑖𝑡. The relative tolerances in further experiments were chosen to keep fractional decay of total energy below 10−4.</p>
            <p>Particle on radial trajectory: The motion of two particles with velocities 𝑣𝑒𝑠𝑐𝑎𝑝𝑒±Δ𝑣 outwards from a central mass was simulated. It was found that the total energy decreases over long times for both particles. Therefore, particles that were initially expected to escape to infinity would not escape in the simulation if the accuracy of the simulator was too low.</p>
            <p>Time-complexity:The time-complexity of the developed algorithm was tested by applying the algorithm to 𝑁 particles orbiting a central body.</p>
            <p>It was found that the time-complexity of different methods in the simulator match the theoretical complexities. Due to the higher overhead on the 𝑂(𝑁𝑙𝑜𝑔𝑁) methods it is more efficient to use the direct N-body 𝑂(𝑁2) method for simulating less than 400 particles.
The dependence of execution time vs relative tolerance was evaluated for the same setup:Increasing the relative tolerance therefore does not slow the code significantly for simulation of circular orbits, however for more complex interactions the effect of lowering the tolerance can lead to a more significant increase in execution time due to changes in the adaptive timesteps.</p>
            <p></p>
            <p></p>


            <h2>Galactic collisions (tidal tails)</h2>
            <h3>Theory & some images</h3>
            <img src="images/Tadpole.jpg" alt="The tidal tail of the Tadpole galaxy"/>
            Source: NASA, 2017. Tadpole’s Tidal Tail URL http://www.nasa.gov/multimedia/imagegallery/image_feature_573.html (Image Credit: NASA)
            Picture taken with the Hubble Space Telescope. 420 million light years away. 280000 light years long tail. Formed during a close encounter with a neighbouring galaxy.
            
            <p>Tidal effects are caused by the gradient of the gravitational force - nearby particles feel a different gravitational force. In a galactic collision the perturbing galaxy exerts different gravitational forces on particles in different parts of the galactic disk creating tidal tails.</p>
            <p>The formation of tidal tails was modelled by considering galaxies as uniform Keplerian disks of stars orbiting masses at the centres of the galaxies. These are not accurate to real galaxies which have complicated radial distributions of velocity and density, but still provide insight into the tidal processes involved.[3]</p>
            <p>Simple tidal tail system:An initial problem was set up with five rings of lightweight particles orbiting around a central mass and a second body (same central mass) approaching it on a parabolic orbit.[15]</p>

            Give buttons that change which .gif plays - show the difference between prograde/retrograde (all combinations of clockwisse/anticlockwise rotation)

            <p>On prograde approach a tidal tail is formed (a), and there is a dense overlap in positions of particles that were initially on orbits of different radii (b). This increase in density is thought to correspond to considerable amounts of star formation in interacting galaxies.[8] A galactic bridge (c) is formed between the two heavy bodies. Outer stars can end up being captured by the passing galaxy (d). The disturbance to star orbits on prograde approach is strong since particles in the disk and the perturbing galaxy move with similar angular velocity and in the same direction (prograde) meaning the gravitational effect on stars by the perturbing galaxy is more unidirectional and lasts for a longer time leading to a stronger gravitational and tidal effect.</p>

            <p>This resonant disruption does not occur in retrograde approaches and particles orbits are altered only slightly:</p>

            <CodeBlock code={nearestNeighbourCode} language="python" />

            <CodeBlock code={simulationCode} language="python" />

            <CodeBlock code={derivativesCode} language="python" />
            
            <h3>My results</h3>
            <h2>Saturn's rings </h2>
            <h3>(Huygen's) Gap</h3>
            <h3>Spiral density waves</h3>

            <img src="images/SpiralDensityWaves.jpg" alt="Spiral density waves and Spiral Bending Waves imaged in Saturn's S rings"/>

            https://photojournal.jpl.nasa.gov/catalog/PIA10501

            <h3>Spiral bending waves</h3>
            <h2>Bibliography</h2>
            <Bibliography references={references} />
          </div>
        </div>



      </div>
    </div>
  );
}

export default PortfolioSimulation;