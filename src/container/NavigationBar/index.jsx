import * as React from "react";
import styles from "./styles.module.css";
import Zoom from "@material-ui/core/Zoom";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import SideBar from "./SideBar";
import { Box } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { useStoreValue } from "react-context-hook";
import { isAuthenticated, removeUser } from "../../auth/authentication";
import { Link } from "react-router-dom";

const NavigationBar = ({ history }) => {
  const [anchorEl, setAnchor] = React.useState(null);
  const user = useStoreValue("user");

  if (!isAuthenticated()) return null;
  if (!user) return null;
  return (
    <React.Fragment>
      <Box className={styles.topBar} bgcolor={"white"}>
        <Box flexGrow={1}></Box>
        <Button
          className={styles.topButton}
          classes={{ label: styles.topButtonLabel }}
          aria-owns={anchorEl ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={(e) => {
            setAnchor(anchorEl ? null : e.currentTarget);
          }}
        >
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={"https://picsum.photos/100/100/?random"}
            className={styles.smallProfileImage}
          />
          <Box style={{ textTransform: "capitalize" }}>
            {user.firstName} {user.lastName}
          </Box>
          <ArrowDropDownIcon className={styles.topBarIcon} />
        </Button>
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          transition
          className={styles.menuPaper}
        >
          {({ TransitionProps, placement }) => (
            <Zoom
              direction="left"
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper style={{ width: "90px" }}>
                <ClickAwayListener onClickAway={() => setAnchor(null)}>
                  <MenuList>
                    {/* <MenuItem>
                      <Link
                        to="/account"
                        style={{ textDecoration: "none", color: "#333" }}
                      >
                        My Profile
                      </Link>
                    </MenuItem> */}
                    <MenuItem>
                      <Link
                        to="/login"
                        onClick={() => {
                          removeUser(); // from local storage
                          setAnchor(null);
                        }}
                        style={{ textDecoration: "none", color: "#333" }}
                      >
                        Log out
                      </Link>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Zoom>
          )}
        </Popper>
      </Box>
      <SideBar history={history} />
    </React.Fragment>
  );
};

export default withWidth()(NavigationBar);
