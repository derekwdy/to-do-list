const express = require("express");
const router = express.Router();
const Todo = require("../models/to-do-item");

router.get("/to-dos", (req, res, next) => {
  Todo.find({}, ["action", "isCompleted"])
    .then((data) => res.json(data))
    .catch(next);
});

router.post("/to-dos", (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty",
    });
  }
});

router.delete("/to-dos/:id", (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.patch("/to-dos/:id", (req, res, next) => {
  Todo.findOneAndUpdate(
    { _id: req.params.id },
    { action: req.body.action, isCompleted: req.body.isCompleted }
  )
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
