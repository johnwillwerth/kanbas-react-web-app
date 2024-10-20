import { Route, Routes, Navigate } from "react-router";
import LabNavigation from "./Navigation";
import TOC from "./TOC";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import "../styles.css";
export default function Labs() {
  return (
    <div id="wd-labs">
      <LabNavigation />
        <div className="wd-main-content-offset p-3">
          <h1>Labs</h1>
          <h2>John Willwerth</h2>
          <h3>CS5610 20595 - SEC 02, Fall 2024</h3>
          <TOC />
            <Routes>
              <Route path="/" element={<Navigate to="TOC" />} />
              <Route path="Lab1" element={<Lab1 />} />
              <Route path="Lab2" element={<Lab2 />} />
              <Route path="Lab3/*" element={<Lab3 />} />
              <Route path="Lab4/*" element={<Lab4 />} />
            </Routes>
        </div>
    </div>
  );
}
