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

  updateTodoAction = (id, action) => {
    axios
      .patch(`/api/to-dos/${id}`, { action: action })
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { todos } = this.state;
    return (
      <div>
        <h1>To-do List</h1>
        <Input getTodos={this.getTodos} />
        <ListTodo
          todos={todos}
          deleteTodo={this.deleteTodo}
          toggleTodo={this.toggleTodo}
          updateTodoAction={this.updateTodoAction}
        />
      </div>
    );
  }
}

export default Todo;
