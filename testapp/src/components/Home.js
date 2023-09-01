import React from 'react';
import './Home.css';
import Intro from './Intro';
import ProfilePicture from './ProfilePicture';
import Skills from './Skills';
import Header from './Header';
import Education from './Education';
import CustomScrollbar from './CustomScrollbar';
import { Scrollbars } from 'react-custom-scrollbars-2';

function Home() {
    return (
        
        <Scrollbars style={{ width: "100vw", height: "100vh"}}>
        <div className="App">
            <Header />
            
            <main className='content'>
                <div className='content-container'>
                    <ProfilePicture />
                    <Intro />
                </div>
                <div className='vertical-container'>
                <div className='content-container'>
        
                    <Education />
                    <Skills>

                    </Skills>


                </div>
                <div className='content-container'>
                    <Skills>

                    </Skills>
                    <Education />

                </div>
                <div className='content-container'>
        
                    <Education />
                    <Skills>

                    </Skills>


                </div>
        </ div>
      </main >
      
    </div >
    </Scrollbars>
  );
}

export default Home;