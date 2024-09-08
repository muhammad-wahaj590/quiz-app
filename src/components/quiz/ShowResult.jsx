import React, { useEffect, useState } from 'react';
import './ShowResult.css';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function ShowResult({ questions, createMarkUp, reset }) {
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (questions.length > 0) {
      const correctAnswers = questions.filter((q) => q.userAnswer === q.correct_answer).length;
      setScore(correctAnswers);
      setPercentage((correctAnswers / questions.length) * 100);
    }
  }, [questions]);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="show-result" style={{ color: 'white' }}>
      <div className="result-top">
        {percentage >= 50 ? (
          <>
            <CheckCircleOutlineIcon className='result-icon' />
            <h1>Congratulations! You Passed the Test</h1>
          </>
        ) : (
          <>
            <CancelOutlinedIcon className='result-icon' />
            <h1>Sorry, You Didn't Pass the Test</h1>
          </>
        )}
      </div>

      {/* Result Summary */}
      <div className="result-summary">
        <table>
          <thead>
            <tr>
              <th>No. of Questions</th>
              <th>Correct Attempts</th>
              <th>Wrong Attempts</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{questions.length}</td>
              <td>{score}</td>
              <td>{questions.length - score}</td>
              <td>{percentage.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Preview Section */}
      <div className="preview-section">
        <button onClick={togglePreview} className="preview-btn">
          {showPreview ? 'Hide Details' : 'Preview Wrong Answers'}
        </button>

        {showPreview && (
          <div className="result-content">
            {questions
              .filter((q) => q.userAnswer !== q.correct_answer) // Only show wrong answers
              .map((q, i) => {
                return (
                  <div className="questionSection" key={i}>
                    <p
                      className="questionText"
                      dangerouslySetInnerHTML={createMarkUp(q.question)}
                    ></p>

                    {/* <hr /> */}
                    <div className="answerSection">
                        <div className="userAnswer">
                      <h4>Your answer:</h4>
                      <p
                        className="wrong"
                        dangerouslySetInnerHTML={createMarkUp(q.userAnswer)}
                      ></p>
                        </div>
                        <div className="correctAnswer">
                      <h4>Correct answer:</h4>
                      <p
                        dangerouslySetInnerHTML={createMarkUp(q.correct_answer)}
                        className="correct"
                      ></p>
                        </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="resultBtn">
        <button>
          <Link to="/play/instructions" className="play-button">
            Play Again
          </Link>
        </button>
        <button>
          <Link to="/" className="play-button">
            Home
          </Link>
        </button>
      </div>
      <p className='result-footer'>Want to earn really cool cash while playing games? <span><Link to='/signup' className='footer-link'>Create an account now!</Link></span></p>
    </div>
  );
}

export default ShowResult;
