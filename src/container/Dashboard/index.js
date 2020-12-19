import { useStore } from "react-context-hook";
import { Box, Button, Typography, Link } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import DatePicker from "../../component/DatePicker";
import { useState, useEffect } from "react";
import TodoList from "../Todo/TodoList";
import { getBatchTodo } from "../../api/api";

const Dashboard = () => {
  const [user] = useStore("user");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const d = date.toISOString().split("T")[0];
    if (user)
      getBatchTodo({
        due_date__gte: d,
        due_time__gte: "0:0:0",
        due_date__lte: d,
        due_time__lte: "23:59:59",
      });
  }, [date, user]);

  const previousDate = () => {
    const day = date.getDate();
    const prevDate = new Date(date.setDate(day - 1));
    setDate(prevDate);
  };

  const nextDate = () => {
    const day = date.getDate();
    const nxtDate = new Date(date.setDate(day + 1));
    setDate(nxtDate);
  };

  const isSameDay = () => {
    const today = new Date();
    if (today.getFullYear() !== date.getFullYear()) return false;
    else if (today.getMonth() !== date.getMonth()) return false;
    else if (today.getDate() !== date.getDate()) return false;
    else return true;
  };

  return user ? (
    <Box
      style={{
        position: "fixed",
        left: "84px",
        top: "45px",
        width: "100%",
        height: "100%",
        overflow: "scroll",
        backgroundColor: "#eeeeee50",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          position: "fixed",
          alignItems: "center",
          color: "#333",
          top: 45,
          left: 80,
          width: "100%",
          backgroundColor: "white",
          borderBottom: "1px solid #00000030",
          boxShadow: "0px -2px 10px 5px #fff",
        }}
      >
        <Box display="flex" flexDirection="row">
          <Button onClick={() => previousDate()}>
            <KeyboardArrowLeft />
          </Button>
          <Box>
            <DatePicker
              variant="inline"
              margin="none"
              date={date}
              setDate={setDate}
              InputProps={{
                disableUnderline: true,
                style: {
                  textAlign: "center",
                  paddingTop: "2px",
                  marginLeft: "5px",
                  marginRight: "-45px",
                },
              }}
            />
          </Box>
          <Button onClick={() => nextDate()}>
            <KeyboardArrowRight />
          </Button>
        </Box>
        {!isSameDay() ? (
          <Link
            onClick={() => setDate(new Date())}
            style={{
              fontSize: "12px",
              textDecoration: "underline",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            Jump To Today
          </Link>
        ) : (
          <Typography style={{ fontSize: "12px" }}>(Today)</Typography>
        )}
      </Box>
      <Box pl={1} mt={6} pb={4} flexGrow={1}>
        <TodoList />
      </Box>
    </Box>
  ) : null;
};
export default Dashboard;
