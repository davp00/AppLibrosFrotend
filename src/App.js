import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Register";
import './App.css';
import './CSS/spacing.css';
import {PrivateRoute} from "./Component/PrivateRoute";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <Router >
      <Route path={'/login'} exact>
        <LoginPage />
      </Route>
      <Route path={'/register'} exact>
        <RegisterPage />
      </Route>
        <PrivateRoute path={'/admin'} component={ HomePage }/>
        <Route exact path={'/'}>
            <Redirect to={'login'}/>
        </Route>
    </Router>
  );
}

export default App;
