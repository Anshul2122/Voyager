import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { useState, useEffect } from "react";

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem('auth_token'); // Replace with your token storage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={ <Layout><SignIn/></Layout>} />
        <Route path="/" element={<Layout>
          <p>Home page</p>
        </Layout>} />
        <Route path="/register" element={<Layout>
          <Register/>
        </Layout>} />
        
        <Route path="/search" element={<Layout>
          <p>Search page</p>
        </Layout>} />
        <Route />
      </Routes>
    </Router>
  )
}

export default App
