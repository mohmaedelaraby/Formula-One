import "./LoadingStyle.css";
import { CircularProgress } from "@mui/material";

function LoadingPage() {
  return (
    <div className="loading">
      <div className="loading_container">
        <CircularProgress size="100px" color="error"/>
      </div>
    </div>
  );
}

export default LoadingPage;
