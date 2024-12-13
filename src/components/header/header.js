import React from 'react';
import './header.css';
export default function Header() {
    return (
        <header className='header'>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='logo'>
                            <img src='./images/forecast_sun_icon.svg' alt='forecast_sun_icon' />
                            <span>Weather By VicBox</span>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <nav className='nav'>
                            <ul>
                                <li><a href='#'>GitHub</a></li>
                                <li><a href='#'>About</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}