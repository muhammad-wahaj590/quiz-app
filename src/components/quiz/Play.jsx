import React, { useEffect, useState } from "react";
import "./Play.css";
import { Helmet } from "react-helmet";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import TipsAndUpdatesSharpIcon from "@mui/icons-material/TipsAndUpdatesSharp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../.././assets/img/fade-stagger-circles.svg";
import M from "materialize-css/dist/js/materialize.min.js";
import { Modal, Box, Typography, Button } from "@mui/material"; // Import Modal and related components
import ShowResult from "./ShowResult";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Play() {
  const { no, cat, dif } = useParams();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(""); // selected answer
  const [questions, setQuestions] = useState([]); // all questions
  const [currQuestionNo, setCurrQuestionNo] = useState(0); // current question
  const [allAnswers, setAllAnswers] = useState([]); // all answers
  const [result, setResult] = useState(false); // show result
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(2); // Number of hints
  const [hiddenAnswers, setHiddenAnswers] = useState([]); // track hidden answers
  const [time, setTime] = useState(1350); // Timer starts from 15 seconds for example
  const [openModal, setOpenModal] = useState(false); // Control modal state
  const [nextBtn, setNextBtn] = useState('Next')

  const createMarkUp = (text) => {
    return { __html: text };
  };

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${no}&category=${cat}&difficulty=${dif.toLowerCase()}&type=multiple`;
      const { data } = await axios.get(url);
      console.log(data);
      setQuestions(data.results);
      setAllAnswers(
        [
          ...data.results[0].incorrect_answers,
          data.results[0].correct_answer,
        ].sort(() => Math.random() - 0.5)
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizData();
  }, [no, cat, dif]);

  // Timer functionality
  useEffect(() => {
    if (time > 0) {
      const timerInterval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearInterval(timerInterval); // Clean up on unmount
    } else {
      // Open modal when time is up
      setOpenModal(true);
    }
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getAnswer = (ans) => {
    if (!selected) { // Disable selection once an answer is selected
      questions[currQuestionNo].userAnswer = ans;
      setSelected(ans);
  
      const isCorrectAnswer = ans === questions[currQuestionNo].correct_answer;
      setIsCorrect(isCorrectAnswer);
  
      M.toast({
        html: `<div class="custom-toast">${isCorrectAnswer ? "Correct Answer!" : "Wrong Answer!"}</div>`,
        classes: `custom-toast-container ${isCorrectAnswer ? "correct-toast" : "wrong-toast"}`,
        displayLength: 1000,
        inDuration: 1000,
        outDuration: 2000,
        completeCallback: () => console.log("Toast closed!"),
      });
  
      console.log("Option clicked:", ans, "Correct:", isCorrectAnswer);
    }
  };
  

  const useHint = () => {
    if (hintsLeft > 0 && allAnswers.length > 2) {
      const incorrectAnswers = allAnswers.filter(
        (ans) => ans !== questions[currQuestionNo].correct_answer && !hiddenAnswers.includes(ans)
      );

      if (incorrectAnswers.length > 1) {
        const randomAnswerToHide = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
        setHiddenAnswers([...hiddenAnswers, randomAnswerToHide]); // Track hidden answers
        setHintsLeft(hintsLeft - 1);
      }
    } else {
      M.toast({
        html: `<div class="custom-toast">No hints left!</div>`,
        classes: "custom-toast-container wrong-toast",
        displayLength: 1000,
        inDuration: 1000,
        outDuration: 2000,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currQuestionNo < questions.length - 1) {
      setCurrQuestionNo(currQuestionNo + 1);
      setSelected("");
      setHintsLeft(2); // Reset the hints for the next question
      setAllAnswers(
        [
          ...questions[currQuestionNo + 1].incorrect_answers,
          questions[currQuestionNo + 1].correct_answer,
        ].sort(() => Math.random() - 0.5)
        );
    } else {
      setResult(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currQuestionNo > 0) {
      setCurrQuestionNo(currQuestionNo - 1);
      setSelected(questions[currQuestionNo - 1].userAnswer || "");
      setAllAnswers(
        [
          ...questions[currQuestionNo - 1].incorrect_answers,
          questions[currQuestionNo - 1].correct_answer,
        ].sort(() => Math.random() - 0.5)
      );
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setResult(true); // Show the result screen
  };

  return (
    <>
      {loading ? (
        <div className="loader">
          <img src={Loader} alt="Loading..." />
        </div>
      ) : !result ? (
        <div>
          {questions.length > 0 && (
            <>
              <Helmet>
                <title>Quiz Page</title>
              </Helmet>
              <div className="questions">
                <div className="lifeline-container">
                  <p className="time">
                    {formatTime(time)}{" "}
                    <span>
                      <AccessTimeIcon />
                    </span>
                  </p>
                  <p className="lifelines">
                    <span className="lifeline">{hintsLeft}</span> {/* Updated Hints */}
                    <TipsAndUpdatesSharpIcon onClick={useHint} /> {/* Hint Icon */}
                  </p>
                </div>
                <div className="question-no">
                  <h5>
                    <span>{`${currQuestionNo + 1} of ${
                      questions.length
                    }`}</span>
                  </h5>
                </div>
                <div className="question-container">
                  <div className="question">
                    <p
                      className="questionText"
                      dangerouslySetInnerHTML={createMarkUp(
                        questions[currQuestionNo].question
                      )}
                    ></p>
                  </div>
                  <div className="answers">
                    {allAnswers.map((ans, i) => (
                      <div key={i} className="answer-container">
                        <input
                          type="radio"
                          name="answer"
                          value={ans}
                          checked={selected === ans}
                          onChange={() => getAnswer(ans)}
                          style={{
                            visibility: hiddenAnswers.includes(ans)
                              ? "hidden"
                              : "visible",
                          }}
                          disabled={selected}
                        />
                        <div
                          className={
                            selected === ans
                              ? `selected answer ${
                                  isCorrect && selected === ans
                                    ? "correct-answer"
                                    : "wrong-answer"
                                }`
                              : "answer"
                          }
                          onClick={() => getAnswer(ans)}
                          style={{
                            visibility: hiddenAnswers.includes(ans)
                              ? "hidden"
                              : "visible",
                          }}
                        >
                          <p dangerouslySetInnerHTML={createMarkUp(ans)}></p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="btn">
                    <button
                      className="prevBtn"
                      onClick={handlePrevQuestion}
                      disabled={currQuestionNo === 0}
                    >
                      Previous
                    </button>

                    <button
                      className="nextBtn"
                      onClick={handleNextQuestion}
                      disabled={!selected}  // Disable "Next" button if no option is selected
                    >
                      {currQuestionNo === questions.length - 1 ? "Submit" : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <ShowResult questions={questions} createMarkUp={createMarkUp} reset />
      )}

      {/* Modal */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={style}>
          <Typography variant="h6">Time is up!</Typography>
          <Typography variant="body2">Click OK to see your result.</Typography>
          <Button variant="contained" onClick={handleModalClose}>
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Play;
