import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./style.css";

function Page404() {
  return (
    <div className="no_data_found">
      <WarningAmberIcon color="error" className="no_data_found_icon" />
      <div className="no_data_found_text">404 ... This Page not exist</div>
    </div>
  );
}

export default Page404;
