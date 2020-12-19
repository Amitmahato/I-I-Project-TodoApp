import * as React from "react";
import { Box, Typography } from "@material-ui/core";
import styles from "./styles.module.css";
import ListIcon from "@material-ui/icons/List";
import QueueIcon from "@material-ui/icons/Queue";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { AccountBox } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { history } from "../../store/store";

const activeTabList = {
  dashboard: "Dashboard",
  addEditTask: "Add More",
  account: "Account",
};

const SideBar = ({ history }) => {
  const [selected, setSelected] = React.useState(
    activeTabList[history.location.pathname.replace("/", "")] || "dashboard"
  );
  React.useEffect(() => {
    setSelected(
      activeTabList[history.location.pathname.replace("/", "")] || "dashboard"
    );
  }, [history.location]);
  return (
    <Box
      style={{
        display: "flex",
        width: "84px",
        height: "100%",
        backgroundColor: "#3f51b5",
        position: "absolute",
        left: 0,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AssignmentTurnedInIcon className={styles.logo} />
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <Box
            mt={3}
            className={styles.menuItem}
            style={{
              backgroundColor: selected === "Dashboard" ? "#2f41a5" : "#3f51b5",
            }}
            onClick={() => setSelected("Dashboard")}
          >
            <ListIcon className={styles.menuItemIcon} />
            <Typography className={styles.label} variant="button">
              Dashboard
            </Typography>
          </Box>
        </Link>

        <Link to="/addEditTask" style={{ textDecoration: "none" }}>
          <Box
            className={styles.menuItem}
            style={{
              width: "84px",
              backgroundColor: selected === "Add More" ? "#2f41a5" : "#3f51b5",
            }}
            mt={2}
            onClick={() => setSelected("Add More")}
          >
            <QueueIcon className={styles.menuItemIcon} />
            <Typography className={styles.label} variant="button">
              Add Task
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box>
        {/* <Link to="/account" style={{ textDecoration: "none" }}>
          <Box
            className={styles.menuItem}
            style={{
              width: "84px",
              backgroundColor: selected === "Account" ? "#2f41a5" : "#3f51b5",
            }}
            mt={2}
            onClick={() => setSelected("Account")}
          >
            <AccountBox className={styles.menuItemIcon} />
            <Typography className={styles.label} variant="button">
              Account
            </Typography>
          </Box>
        </Link> */}
      </Box>
    </Box>
  );
};

export default SideBar;
