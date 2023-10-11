// .......................Import the Todo model....................//

const express = require("express");
const router = express.Router();
const { Todo } = require("../model/todo.model"); 

//.......................... Create a new todo................................//

router.post("/create", async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = new Todo({ title, description, completed });
    const newTodo = await todo.save();
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Unable to create a new todo." });
  }
});

// ..........................Get all todos........................................//

router.get("/find", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch todos." });
  }
});

// ...............................Get a single todo by ID................................//

router.get("/find:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the todo." });
  }
});

//..........................Update a todo by ID..............................//

router.put("/update/:id", async (req, res) => {
    try {
      const { title, description } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
        title,
        description,
      });
  
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found." });
      }
  
      res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update todo' });
    }
  });



//.........................Delete a todo by ID...............................//

router.delete("/delete/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }
    res.json({ message: "Todo deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the todo." });
  }
});

module.exports = {router};
