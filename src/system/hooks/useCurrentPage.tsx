import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useCurrentPage() {
  const location = useLocation();
  const [page, setPage] = useState<string>();
  useEffect(() => {
    if (location.pathname.includes("seasons")) {
      setPage("Seasons");
    } else if (location.pathname.includes("races")) {
      setPage("Race");
    } else if (location.pathname.includes("results")) {
      setPage("Results");
    }
  }, [location]);

  return {
    title: page,
  };
}
