"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");
      console.log("Overdue");
      await this.overdue();
      console.log("\n");
      console.log("Due Today");
      await this.dueToday();
      console.log("\n");
      console.log("Due Later");
      await this.dueLater();
    }
    static async overdue() {
      var formattedDate = (d) => {
        return d.toISOString().split("T")[0];
      };
      var dateToday = new Date();
      const yesterday = formattedDate(
        new Date(new Date().setDate(dateToday.getDate() - 1))
      );
      const todos = await Todo.findAll({
        where: { dueDate: yesterday },
      });
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(todoList);
    }
    static async dueToday() {
      var formattedDate = (d) => {
        return d.toISOString().split("T")[0];
      };
      var dateToday = new Date();
      const today = formattedDate(dateToday);
      const todos = await Todo.findAll({
        where: { dueDate: today },
      });
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(todoList);
    }
    static async dueLater() {
      var formattedDate = (d) => {
        return d.toISOString().split("T")[0];
      };
      var dateToday = new Date();
      const tomorrow = formattedDate(
        new Date(new Date().setDate(dateToday.getDate() + 1))
      );
      const todos = await Todo.findAll({
        where: { dueDate: tomorrow },
      });
      const todoList = todos.map((todo) => todo.displayableString()).join("\n");
      console.log(todoList);
    }
    static async markAsComplete(id) {
      const todo = await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(todo.displayableString());
    }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
