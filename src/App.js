import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import './App.css';
import './CSS/spacing.css';

function App() {
  return (
    <Router >
      <Route path={'/login'} exact>
        <LoginPage />
      </Route>
      <Route path={'/register'} exact>
        <RegisterPage />
      </Route>
    </Router>
  );
}

export default App;
