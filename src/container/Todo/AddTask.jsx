import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  Typography,
} from "@material-ui/core";
import styles from "./styles.module.css";
import DatePicker from "../../component/DatePicker";
import TimePicker from "../../component/TimePicker";
import { getTodoById, postTodoItem, updateTodoItem } from "../../api/api";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const AddTask = (props) => {
  const [task, setTask] = useState({
    id: null,
    title: "",
    date: moment(new Date()).add("day", 1),
    description: "",
    isCompleted: false,
  });
  const [saving, setSaving] = useState(false);
  const [createAnother, setCreateAnother] = useState(false);

  useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      getTodoById(id).then((todo) => {
        setTask({
          id,
          title: todo.title,
          date: moment(todo.due_date + " " + todo.due_time),
          description: todo.content,
          isCompleted: todo.is_completed,
        });
      });
    }
  }, [props.match.params.id]);

  const handleSubmit = async () => {
    setSaving(true);
    task.id
      ? await updateTodoItem({
          id: task.id,
          title: task.title,
          content: task.description,
          due_date: task.date.toISOString().split("T")[0],
          due_time: task.date.toISOString().split("T")[1],
          is_completed: task.isCompleted,
        })
      : await postTodoItem({
          title: task.title,
          content: task.description,
          due_date: task.date.toISOString().split("T")[0],
          due_time: task.date.toISOString().split("T")[1],
          is_completed: task.isCompleted,
        });
    setSaving(false);
    if (!createAnother) {
      props.history.push("/dashboard");
    } else if (task.id) {
      props.history.push("/addEditTask");
    }
    setTask({ ...task, id: null, title: "", description: "" });
  };

  return (
    <Box
      style={{
        position: "fixed",
        left: "95px",
        top: "45px",
        width: "100%",
        height: "100%",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "40px",
        color: "#444",
      }}
    >
      <Box component="h2" alignSelf="flex-start">
        {task.id ? "Edit Task" : "Add Task"}
      </Box>
      <Box className={styles.container}>
        <Box display="flex" flexDirection="row">
          <Box className={styles.dateTimePickerContainer}>
            <DatePicker
              variant="inline"
              inputVariant="outlined"
              label="Choose Due Date"
              margin="normal"
              date={task.date}
              setDate={(date) => {
                setTask({ ...task, date });
              }}
            />
            {/* <TimePicker
              variant="inline"
              inputVariant="outlined"
              label="Choose Due Time"
              margin="normal"
              date={task.date}
              setDate={(date) => {
                setTask({ ...task, date });
              }}
            /> */}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              ml={-1.5}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setTask({ ...task, isCompleted: !task.isCompleted });
              }}
            >
              <Checkbox color="primary" checked={task.isCompleted} />
              <Typography component="span">Is Completed?</Typography>
            </Box>
          </Box>
          <Box className={styles.dateTimerPickerSeparator} />
        </Box>
        <Box className={styles.taskDetails}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            variant="outlined"
            value={task.title}
            onChange={(e) => {
              const value = e.target.value;
              setTask({ ...task, title: value });
            }}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            variant="outlined"
            multiline
            rows={10}
            value={task.description}
            onChange={(e) => {
              const value = e.target.value;
              setTask({ ...task, description: value });
            }}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              ml={-1.5}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCreateAnother(!createAnother);
              }}
            >
              <Checkbox color="primary" checked={createAnother} />
              <Typography component="span">
                Create Another After Save
              </Typography>
            </Box>
            <Box className={styles.submitButtonContainer}>
              <Box mr={2.5} pb={0.5}>
                <Link
                  to="/dashboard"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  <Typography>Cancel</Typography>
                </Link>
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? "Saving" : task.id ? "Update" : "Submit"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTask;
