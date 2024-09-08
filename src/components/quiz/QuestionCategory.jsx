import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./QuestionCategory.css";
import { Modal, Box, Typography, Button } from "@mui/material"; // Import Modal components

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

function QuestionCategory() {
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [qNo, setQno] = useState(0);
  const [openModal, setOpenModal] = useState(false); // Modal state

  const navigate = useNavigate();

  const fetchQuestionCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    console.log(data);
    setCats(data.trivia_categories);
  };

  useEffect(() => {
    fetchQuestionCategories();
  }, []);

  const submitHandler = () => {
    if (parseInt(qNo) < 1 || parseInt(qNo) > 15 || cat === 0 || cat === "" || difficulty === "") {
      setOpenModal(true); // Open modal when inputs are incorrect
      return false;
    } else {
      const url = `/play/${cat}/${difficulty}/${qNo}`;
      navigate(url);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close modal on OK button click
  };

  return (
    <div className="category-section">
      <h1>Select Category</h1>
      <select
        value={cat}
        onChange={(e) => setCat(e.target.value)}
        className="input-text"
      >
        <option value="" disabled>
          Please select your category
        </option>
        {cats.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="input-text"
      >
        <option value="" disabled>
          Select Difficulty
        </option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <input
        className="input-text"
        label="Number of Questions (1-15)"
        value={qNo}
        onChange={(e) => setQno(e.target.value)}
        type="number"
        min="1"
        max="15"
      />
      <div className="action-step">
        <Link to="/" className="back-btn">
          Go Back
        </Link>
        <Link to="#" className="start-btn" onClick={submitHandler}>
          Start
        </Link>
      </div>

      {/* Modal component */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Input Missing!
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Please make sure you select a category, difficulty, and number of questions.
          </Typography>
          <Button variant="contained" onClick={handleModalClose} sx={{ mt: 2 }}>
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default QuestionCategory;
