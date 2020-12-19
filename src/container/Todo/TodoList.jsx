import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { useStoreValue } from "react-context-hook";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateTodoItem } from "../../api/api";

const useStyles = makeStyles({
  cardRoot: {
    width: "500px",
    height: "200px",
    boxShadow: "-2px 2px 4px 4px rgba(200,200,200,0.9)",
    backgroundColor: "white",
  },
  cardHeader: {
    width: "100%",
    height: "10px",
    borderBottom: "1px solid gray",
  },
  actionContainer: {
    height: "10px",
    marginRight: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardContent: {
    marginTop: "-5px",
    maxWidth: "480px",
    height: "108px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 5,
    whiteSpace: "wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const TodoCard = ({ todo, actions }) => {
  const styles = useStyles({});
  return (
    <Card className={styles.cardRoot}>
      <CardHeader
        className={styles.cardHeader}
        subheader={`${moment([todo.due_date, todo.due_time].join("T")).format(
          "dddd, MMMM Do YYYY"
        )}${todo.is_completed ? " (Done)" : ""}`}
        action={
          <Box className={styles.actionContainer}>
            <Box mr={1}>
              <IconButton size="small">
                <Tooltip title="Edit">
                  <Link to={`/addEditTask/${todo.id}`}>
                    <EditIcon fontSize="small" color="primary" />
                  </Link>
                </Tooltip>
              </IconButton>
            </Box>

            <Box mr={1}>
              <IconButton
                size="small"
                onClick={() =>
                  todo.is_completed ? () => {} : actions.markAsDone(todo)
                }
                disableRipple={todo.is_completed}
              >
                {!todo.is_completed ? (
                  <Tooltip title="Mark As Done">
                    <DoneIcon fontSize="small" color="primary" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Task Completed">
                    <DoneAllIcon fontSize="small" style={{ color: "green" }} />
                  </Tooltip>
                )}
              </IconButton>
            </Box>
          </Box>
        }
      />
      <CardContent className={styles.cardContent}>
        <Typography variant="h5">{todo.title}</Typography>
        <Typography variant="body1">{todo.content}</Typography>
      </CardContent>
    </Card>
  );
};

const TodoList = () => {
  const todos = useStoreValue("todos");
  const [leftRightTodos, setLeftRightTodos] = useState({ left: [], right: [] });
  const actions = {
    markAsDone: async (todo) => {
      await updateTodoItem({ ...todo, is_completed: true });
    },
  };
  useEffect(() => {
    const left = [];
    const right = [];
    (todos || []).forEach((todo, index) => {
      index % 2 === 0 ? left.push(todo) : right.push(todo);
    });
    setLeftRightTodos({ left, right });
  }, [todos]);
  return (
    <Box
      width="90%"
      height="90%"
      display="flex"
      flexDirection="row"
      // style={{ backgroundColor: "green" }}
    >
      <Box height="100%" width="50%">
        {(leftRightTodos.left || []).map((todo) => {
          return (
            <Box m={4}>
              <TodoCard todo={todo} actions={actions} />
            </Box>
          );
        })}
      </Box>
      <Box height="100%" width="50%">
        {(leftRightTodos.right || []).map((todo) => {
          return (
            <Box m={4}>
              <TodoCard todo={todo} actions={actions} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TodoList;