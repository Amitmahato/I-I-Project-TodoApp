import * as React from "react";
import { useStore } from "react-context-hook";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

const EnsureUser = ({ component: Component, ...rest }) => {
  const [user] = useStore("user");
  return user ? (
    <Component {...rest} />
  ) : (
    <Box component="div" textAlign="center" width={"100%"}>
      <CircularProgress />
    </Box>
  );
};

export default EnsureUser;
