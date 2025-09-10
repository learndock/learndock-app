import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./AppRoutes.tsx";

export default function App() {

    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}
