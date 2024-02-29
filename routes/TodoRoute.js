const { Router } = require("express");
const {
  getTodo,
  saveTodo,
  updateTodo,
} = require("../controllers/TodoController");

const router = Router();

router.get("/", getTodo);
router.post("/save", saveTodo);
router.put("/update/:id", updateTodo);

module.exports = router;
