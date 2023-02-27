import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/LandingPage.module.css';


const LandingPage = () => {
    const { button } = styles;
    return (
        <>
            <h1> Welcome to Videogames aplication</h1>
            <h4>You can able to explore, play and create your favorites games</h4>

            <div>
                <Link to='/home'>
                    <button className={button} >Start</button>
                </Link>
            </div>
        </>
    )
}
export default LandingPage;
