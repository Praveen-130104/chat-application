import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router , Routes ,Route } from "react-router-dom";
import Friends from "./pages/Friends";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login/>} />
        <Route path = "/signup" element = {<Signup/>} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
        <Route path = "/friends" element = {<Friends/>} />


      </Routes>
    </Router>
  )
}

export default App