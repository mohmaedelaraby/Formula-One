import React from "react";
import "./LoadingStyle.css";
import { CircularProgress } from "@mui/material";

interface Props {
  label?: string;
}
function LoadingPage(props: Props) {
  const { label } = props;
  return (
    <div className="loading">
      <div className="loading_container">
        <CircularProgress size="100px" />
       {/*  {label && (
          <div className="loading_text_container">
            <div>
              <p className="loading_text">{label}</p>
            </div>
            <div className="snippet" data-title="dot-pulse">
              <div className="stage">
                <div className="dot-pulse"></div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default LoadingPage;
