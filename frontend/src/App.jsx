import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App(){

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>Home page</p>
        </Layout>} />
        <Route path="/register" element={<Layout>
          <Register/>
        </Layout>} />
        <Route path="/sign-in" element={ <Layout><SignIn/></Layout>} />
        <Route path="/search" element={<Layout>
          <p>Search page</p>
        </Layout>} />
        <Route />
      </Routes>
    </Router>
  )
}

export default App
