
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignupForm";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import AgregarPublicacion from './pages/AgregarPublicacion';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/agregar-publicacion" element={<AgregarPublicacion />}/>
      </Routes>
    </Router>
  );
}

export default App;
