import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import BarberLogin from "./pages/Barber/BarberLogin";
import ClientLogin from "./pages/Client/ClientLogin";
import BarberDashboard from "./pages/Barber/BarberDashboard";
import ClientDashboard from "./pages/Client/ClientDashboard";
import ClientSignup from "./pages/Client/ClientSignup";
import BarberManagement from "./pages/Barber/Barbeiro";
import ServiceManagement from "./pages/Service/ServiceManagement";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white mb-8">Bem-vindo ao Sistema da Barber Tech</h1>
        
        <nav className="space-x-4 mb-8">
          <Link
            to="/barber-login"
            className="text-white font-semibold bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Login Barbeiro
          </Link>
          <Link
            to="/client-login"
            className="text-white font-semibold bg-purple-700 px-4 py-2 rounded-md hover:bg-purple-800 transition"
          >
            Gerenciar Clientes
          </Link>
          <Link
            to="/management"
            className="text-white font-semibold bg-green-700 px-4 py-2 rounded-md hover:bg-green-800 transition"
          >
            Gerenciar Barbeiros
          </Link>
          <Link
            to="/service-management"
            className="text-white font-semibold bg-teal-700 px-4 py-2 rounded-md hover:bg-teal-800 transition"
          >
            Gerenciar Serviços
          </Link>
        </nav>

        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <Routes>
            <Route path="/barber-login" element={<BarberLogin />} />
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/client-signup" element={<ClientSignup />} />
            <Route path="/barber-dashboard" element={<BarberDashboard />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/management" element={<BarberManagement />} />
            <Route path="/service-management" element={<ServiceManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;