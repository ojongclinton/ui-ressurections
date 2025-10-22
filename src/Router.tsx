import { BrowserRouter, Route, Routes } from "react-router"
import Dashboard from "./quantum-supremacy/pages/Dashboard/Dashboard"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home Route */}
                <Route path="/" element={<div>Home Page</div>} />
                {/* Quantum Supremacy Routes*/}
                <Route path="/quantum-supremacy">
                    <Route index element={<Dashboard />} />
                    <Route path="about" element={<div>About Quantum Supremacy</div>} />
                    <Route path="contact" element={<div>Contact Quantum Supremacy</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}


export default Router
