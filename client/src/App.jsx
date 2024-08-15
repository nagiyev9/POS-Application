import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CardPage from "./pages/CardPage.jsx";
import BillPage from "./pages/BillPage.jsx";
import CustomerPage from "./pages/CustomerPage.jsx";
import StatisticPage from "./pages/StatisticPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { useSelector } from "react-redux";

function App() {

  const card = useSelector((state) => state.card);

  useEffect(() => {
    localStorage.setItem('card', JSON.stringify(card))  
  }, [card]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/card"
          element={
            <RouteControl>
              <CardPage />
            </RouteControl>
          }
        />
        <Route
          path="/invoice"
          element={
            <RouteControl>
              <BillPage />
            </RouteControl>
          }
        />
        <Route
          path="/customer"
          element={
            <RouteControl>
              <CustomerPage />
            </RouteControl>
          }
        />
        <Route
          path="/statistic"
          element={
            <RouteControl>
              <StatisticPage />
            </RouteControl>
          }
        />
        <Route
          path="/product"
          element={
            <RouteControl>
              <ProductPage />
            </RouteControl>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("popUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
