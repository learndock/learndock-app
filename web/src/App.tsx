import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
    </Router>
  );
}
