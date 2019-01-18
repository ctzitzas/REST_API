'use strict';

let express = require('express');
let router = express.Router();
let Question = require("./models").Question;

router.param("qID", function (req, res, next, id) {
  Question.findById(req.body.params.qId, function (err, doc) {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Notfound");
      err.status = 404;
      return next(err);
    }
    res.json(doc);
    return next();
  });
});

// GET /questions
// Route for questions collection
router.get('/', function (req, res, next) {
  Question.find({}).sort({
    createdAt: -1
  }).exec(function (err, questions) {
    if (err) return next(err);
    res.json(questions);
  });
});

// POST /questions
// Route for creating questions
router.post('/', function (req, res, next) {
  let question = new Question(req.body);
  question.save(function (err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// GET /questions/:qID
// Route for a specific question
router.get('/:qID', function (req, res, next) {
  res.json(req.question);
});

// POST /questions/:qID/answers
// Route for creating an answer
router.post('/:qID/answers', function (req, res, next) {
  req.questions.answers.push(req.body);
  req.questions.save(function (err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
});

// PUT /questions/:qID/answers/:aID
// edit a specific answer
router.put('/:qID/answers/:aID', function (req, res) {
  req.answer.update(req.body, function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

// DELETE /questions/:qID/answers/:aID
// delete a specific answer
router.delete('/:qID/answers/:aID', function (req, res) {
  req.answer.remove(function (err) {
    req.question.save(function (err, question) {
      if (err) return next(err)
      res.json(question);
    });
  });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir',
  function (req, res, next) {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
      var err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  },
  function (req, res, next) {
    req.answer.vote(req.vote, function (err, question) {
      if (err) return next(err);
      res.json({
        question
      });
    });
  });

module.exports = router;