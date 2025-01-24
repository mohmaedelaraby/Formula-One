 
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();

  return (
    <div className="no_data_found">
      <WarningAmberIcon color="error" className="no_data_found_icon" />
      <div className="no_data_found_text">404 ... This Page not exist</div>
      <div>...Go To Seasons <strong onClick={()=>{navigate(`/Formula-One/seasons`)}}> Click here</strong></div>
    </div>
  );
}

export default Page404;
