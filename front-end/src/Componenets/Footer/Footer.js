import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Footer = props => {
  let style = { width: "50rem", color: "white" };

  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={10000}
        onClose={props.handleClose}
      >
        <Alert
          onClose={props.handleClose}
          severity="error"
          sx={{ width: "100%", bgcolor: "error.main" }}
        >
          <div className="text-wrap" style={style}>
            {props.errorMess}
          </div>
        </Alert>
      </Snackbar>
    </div>
  );
};
export default Footer;
