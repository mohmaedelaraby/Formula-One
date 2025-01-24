 
import ErrorIcon from "@mui/icons-material/Error";
import "./style.css";

function NotFoundPage() {
  return (
    <div className="no_data_found">
      <ErrorIcon color="error" className="no_data_found_icon" />
      <div className="no_data_found_text">No Data Found</div>
    </div>
  );
}

export default NotFoundPage;
