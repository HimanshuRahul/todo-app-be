const TodoModel = require("../models/TodoModel");
const CounterModel = require("../models/CounterModel");

module.exports.getTodo = async (req, res) => {
  const startTime = Date.now(); // Start time
  const todo = await TodoModel.find();
  const endTime = Date.now(); // End time
  const executionTime = endTime - startTime; // Calculate execution time
  console.log(executionTime);
  res.send({ data: todo, executionTime: `${executionTime}ms` });
};

module.exports.saveTodo = async (req, res) => {
  const startTime = Date.now(); // Start time
  const { text } = req.body;

  try {
    const data = await TodoModel.create({ text });
    const endTime = Date.now(); // End time
    const executionTime = endTime - startTime; // Calculate execution time

    // Increment addCalls counter
    await CounterModel.findOneAndUpdate(
      {},
      { $inc: { addCalls: 1 } },
      { new: true }
    );

    res.send({
      message: "Todo added successfully",
      data,
      executionTime: `${executionTime}ms`,
    });
  } catch (error) {
    const endTime = Date.now(); // End time upon error
    const executionTime = endTime - startTime; // Calculate execution time upon error
    res
      .status(500)
      .send({ error: error.message, executionTime: `${executionTime}ms` });
  }
};

module.exports.updateTodo = async (req, res) => {
  const startTime = Date.now(); // Start time
  const { id } = req.params;
  const { text } = req.body;

  try {
    const updatedDocument = await TodoModel.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );
    const endTime = Date.now(); // End time
    const executionTime = endTime - startTime; // Calculate execution time

    // Increment updateCalls counter
    await CounterModel.findOneAndUpdate(
      {},
      { $inc: { updateCalls: 1 } },
      { new: true }
    );

    res.send({
      message: "Updated Todo Successfully",
      updatedDocument,
      executionTime: `${executionTime}ms`,
    });
  } catch (error) {
    const endTime = Date.now(); // End time upon error
    const executionTime = endTime - startTime; // Calculate execution time upon error
    res
      .status(500)
      .send({ error: error.message, executionTime: `${executionTime}ms` });
  }
};
