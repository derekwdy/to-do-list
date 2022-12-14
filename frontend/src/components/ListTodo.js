import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import TextField from "@mui/material/TextField";
import React from "react";

const ListTodo = ({
  todos,
  deleteTodo,
  toggleTodo,
  handleKeyPress,
  handleChange,
}) => {
  return (
    <List sx={{ bgcolor: "background.paper" }}>
      {todos && todos.length > 0 ? (
        todos.map((todo) => {
          return (
            <ListItem
              key={todo._id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(todo._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: todo.isCompleted === true ? "lightGreen" : "",
                  }}
                  onClick={() => toggleTodo(todo._id, !todo.isCompleted)}
                >
                  <CheckIcon sx={{ color: "green" }} />
                </Avatar>
              </ListItemAvatar>
              <TextField
                fullWidth
                onChange={(event) => handleChange(event, todo._id)}
                onKeyPress={(event) => handleKeyPress(event, todo._id)}
                value={todo.action}
              />
            </ListItem>
          );
        })
      ) : (
        <ListItem>No todo(s) left</ListItem>
      )}
    </List>
  );
};

export default ListTodo;
