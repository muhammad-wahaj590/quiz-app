import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import TipsAndUpdatesSharpIcon from '@mui/icons-material/TipsAndUpdatesSharp';
function Home() {
  return (
    <>
      <Helmet><title>Quiz App - Home</title></Helmet>
      <div className='home'>
        <div className="left">
      <TipsAndUpdatesSharpIcon style={{color:"rgb(250, 250, 153)", width:"60px", height:"50px"}}/>
            <h1>QUIZ WORLD</h1>
            <p>The ultimate quiz platform where knowledge meets fun! Test your skills across a wide range of topics, challenge your friends, and climb the leaderboards. Whether you're a trivia master or just looking for some brain-teasing fun, we've got quizzes for everyone. Ready to prove your knowledge? Let's get started</p>
        <div className="play-button-container">
            <ul>
                <li><Link to="/play/instructions" className='play-button'>Play</Link></li>
            </ul>
        </div>
        </div>
        <div className="right">
        <div className="auth-container">
            <li><Link to="login" className='auth-buttons' id='login-button'>Login</Link></li>
            <li><Link to="/signup" className='auth-buttons' id='signup-button'>Sign up</Link></li>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home
