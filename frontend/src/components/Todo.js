import axios from "axios";
import React, { Component } from "react";
import Input from "./Input";
import ListTodo from "./ListTodo";

class Todo extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios
      .get("/api/to-dos")
      .then((res) => {
        if (res.data) {
          this.setState({
            todos: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  deleteTodo = (id) => {
    axios
      .delete(`/api/to-dos/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  toggleTodo = (id, isCompleted) => {
    axios
      .patch(`/api/to-dos/${id}`, { isCompleted: isCompleted })
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  handleKeyPress = (event, id) => {
    if (event.key !== "Enter") {
      return;
    }

    const { todos } = this.state;
    const changedTodo = todos.find((todo) => todo._id == id);

    axios
      .patch(`/api/to-dos/${id}`, { action: changedTodo.action })
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event, id) => {
    const { todos } = this.state;
    const changedTodo = todos.find((todo) => todo._id == id);
    changedTodo["action"] = event.target.value;
    this.setState(todos);
  };

  render() {
    const { todos } = this.state;

    return (
      <div>
        <h1>To-do List</h1>
        <Input getTodos={this.getTodos} />
        <ListTodo
          todos={todos}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
          handleKeyPress={this.handleKeyPress}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Todo;
