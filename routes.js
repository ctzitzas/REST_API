'use strict';

let express = require('express');
let router = express.Router();

// GET /questions
// Route for questions collection
router.get('/', function (req, res) {
  res.json({
    response: 'You sent me a GET request'
  });
});

// POST /questions
// Route for creating questions
router.post('/', function (req, res) {
  res.json({
    response: 'You sent me a POST request',
    body: req.body
  });
});

// GET /questions/:qID
// Route for a specific question
router.get('/:qID', function (req, res) {
  res.json({
    response: `You sent me a GET request for ID ${req.params.id}`
  });
});

// POST /questions/:qID/answers
// Route for creating an answer
router.post('/:qID/answers', function (req, res) {
  res.json({
    response: 'You sent a POST request to /answers',
    questionId: req.params.qID,
    body: req.body
  });
});

// PUT /questions/:qID/answers/:aID
// edit a specific answer
router.put('/:qID/answers/:aID', function (req, res) {
  res.json({
    response: 'You sent a PUT request to /answers',
    questionId: req.params.qID,
    answerId: req.params.aID,
    body: req.body
  });
});

// DELETE /questions/:qID/answers/:aID
// delete a specific answer
router.delete('/:qID/answers/:aID', function (req, res) {
  res.json({
    response: 'You sent a DELETE request to /answers',
    questionId: req.params.qID,
    answerId: req.params.aID,
  });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir', function (req, res) {
  res.json({
    response: `You sent a POST request to /vote-${req.params.dir}`,
    questionId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir
  });
});



module.exports = router;