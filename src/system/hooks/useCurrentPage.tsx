import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useCurrentPage() {
  const location = useLocation();
  const [page, setPage] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [subTitle, setSubTitle] = useState<string>();
  useEffect(() => {
    if (location.pathname.includes("seasons")) {
      setPage("Seasons");
      setTitle("Formula One");
      setSubTitle("History");
    } else if (location.pathname.includes("races")) {
      setPage("Races");
      setTitle("Season");
      setSubTitle(location.pathname.split("/")[2]);
    } else if (location.pathname.includes("results")) {
      setPage("Results");
      const params = new URLSearchParams(location.search);
      const raceName = decodeURIComponent(params.get("name") || "");
      setTitle(raceName);
      setSubTitle(`Round ${location.pathname.split("/")[3]}`);
    }
  }, [location]);

  return {
    page,
    title,
    subTitle,
  };
}
