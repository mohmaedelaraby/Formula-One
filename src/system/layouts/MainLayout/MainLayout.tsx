import { Outlet } from "react-router-dom";
import "./style.css";
import IntroSection from "../../shared/IntroSection/IntroSection";
import "../../../assets/styles/generic.css";
import "../../../assets/styles/customCards.css";
import "../../../assets/styles/customTable.css";

const MainLayout = () => {
  return (
    <>
      <div className="mainLayout">
        <div>
          <IntroSection />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
