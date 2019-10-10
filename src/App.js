import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import './App.css';
import './CSS/spacing.css';
import {AuthRoute} from "./Component/AuthRoute";
import {PrivateRoute} from "./Component/PrivateRoute";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <Router >
      <AuthRoute path={'/login'} exact>
        <LoginPage />
      </AuthRoute>
      <AuthRoute path={'/register'} exact>
        <RegisterPage />
      </AuthRoute>
        <PrivateRoute path={'/'} exact>
            <HomePage />
        </PrivateRoute>
    </Router>
  );
}

export default App;
