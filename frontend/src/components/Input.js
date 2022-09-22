import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { Component } from "react";

class Input extends Component {
  state = {
    action: "",
  };

  addTodo = () => {
    const task = { action: this.state.action, isCompleted: false };

    if (task.action && task.action.length > 0) {
      axios
        .post("/api/to-dos", task)
        .then((res) => {
          if (res.data) {
            this.props.getTodos();
            this.setState({ action: "", isCompleted: false });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("input field required");
    }
  };

  handleChange = (e) => {
    this.setState({
      action: e.target.value,
    });
  };

  render() {
    let { action } = this.state;
    return (
      <>
        <div>
          <TextField
            required
            label="To-do Item"
            onChange={this.handleChange}
            value={action}
          />
        </div>
        <div>
          <Button variant="contained" color="success" onClick={this.addTodo}>
            ADD TO-DO
          </Button>
        </div>
      </>
    );
  }
}

export default Input;
