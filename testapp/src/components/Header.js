import React from 'react';
import './Header.css';
import ModeSwitch from './ModeSwitch';
import HeaderLogo from './HeaderLogo'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <HeaderLogo />
            </div>

            <div className='header-mid'>
                <h1>Robin's Workshop</h1>
            </div>
            <div className='header-right'>
                <nav className="navigation">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
                <ModeSwitch />
            </div>

        </header>
    );
}

export default Header;