import React from 'react'
import './quizInstructions.css'
import { Helmet } from 'react-helmet'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TipsAndUpdatesSharpIcon from '@mui/icons-material/TipsAndUpdatesSharp';
import { Link } from 'react-router-dom';

function QuizInstructions() {
  return (
    <>
      <Helmet><title>Quiz App - Instructions</title></Helmet>
      <div className="instruction container">
        <h1>How to Play the Game</h1>
        <p>Ensure you read this guide from start to finish.</p>
        <ul className='browser-default' id='main-list'>
          <li>The game has a duration of 15 minutesand ends as soon as your time elapses.</li>
          <li>Every question contains 4 options.</li>
          <li>Sekect the option which best answersthe question by clicking (or selecting) it.</li>
          <li>Each game has 2 lifelines namely:
            <ul id="sub-list">
              <li>2 50-50 chances</li>
              <li>5 Hints</li>
            </ul>
          </li>
          <li>Selecting a 50-0 lifeline by clicking the icon &nbsp;&nbsp; <CompareArrowsIcon className='icon'/> &nbsp;&nbsp; will remove 2 wrong answers, leaving the coorect answer and one wrong answer.</li>
          <li>using a hint by clicking the icon &nbsp;&nbsp;<TipsAndUpdatesSharpIcon  className='icon'/> &nbsp; will remove one wrong answer leaving two wrong answers and one coorect answer. You can use as many hints as possible on a single question.</li>
          <li>Feel free to quit (or retire from) the game at any time. In that case your score will be revealed afterwards.</li>
          <li>The timer starts as soon as the game loads.</li>
          <li>Let's do this if you think you've got what it takes?</li>
        </ul>
        <div className="action">
          <span><Link to="/" className="left">No take me back</Link></span>
          <span><Link to="/play/category" className="right">Okay, Let's do this!</Link></span>
        </div>
      </div>
    </>
  )
}

export default QuizInstructions