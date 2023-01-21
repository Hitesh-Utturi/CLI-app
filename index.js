const { connect } = require("./connect2.js");
const Todo = require("./TodoModel.js");

const createTodo = async () => {
  try {
    await connect();
    const todo = await Todo.addTask({
      title: "Third Item",
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created todo with id ${todo.id}`);
  } catch (error) {
    console.log("there is an error");
    console.error(error);
  }
};

const countItems = async () => {
  try {
    const totalCount = await Todo.count();
    console.log(`Found ${totalCount} items in the table`);
  } catch (error) {
    console.log(error);
  }
};
const getAllTodos = async () => {
  try {
    const todos = await Todo.findAll();
    const todolist = todos.map((todo) => todo.displayableString()).join("\n");
    console.log(todolist);
  } catch (error) {
    console.error(error);
  }
};

const updateItem = async (id) => {
  try {
    await Todo.update(
      { completed: true },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
const deleteOne = async (id) => {
  try {
    const deleteRowCount = await Todo.destroy({
      where: {
        id: id,
      },
    });
    console.log(`Deleted ${deleteRowCount} rows!!`);
  } catch (error) {
    console.error(error);
  }
};
(async () => {
  await getAllTodos();
  await deleteOne(3);
  await getAllTodos();
})();
