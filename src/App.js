import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import { useEffect, useState } from 'react';

function App() {

  const [authed, setAuthed] = useState(false);

  const checkAuth = () => {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <PrivateRoute authed={checkAuth()} path='/users/profile/:id' component={Profile} />
        <PrivateRoute authed={checkAuth()} path='/logout' component={LogOut} />
        <PrivateRoute authed={checkAuth()} path='/' component={Home} />

      </Switch>
    </Router>
  );
}
function LogOut() {
  localStorage.removeItem('token')
  return (
    <Redirect to={{ pathname: '/login' }} />
  )
}
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

export default App;
