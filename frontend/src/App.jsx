import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "./components/Navbar.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import RouteOptimizationPage from "./pages/RouteOptimizationPage.jsx";
const App = () => (
  <Router>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/route-optimization" element={<RouteOptimizationPage />} />
    </Routes>
  </Router>
);

export default App;