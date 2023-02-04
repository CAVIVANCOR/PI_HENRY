import './App.css';
import React, { useState } from 'react'
import { Route, useLocation, Switch, useHistory } from 'react-router-dom';
import Countries from './components/Countries/Countries.jsx';
import Detail from './components/Detail/Detail.jsx';
import Welcome from './components/Welcome/Welcome.jsx';
import Nav from './components/Nav/Nav.jsx';
import TouringForm from './components/TouringForm/TouringForm.jsx';

function App() {
  const [access,setAcces] = useState(false);
  const [countries,setCountries] = useState([]);

  let ubicacion = useLocation();
  let navigate = useHistory();
  
  const onSearch = () =>{

  };

  const login = () =>{
    setAcces(true);
    navigate.push('/home');
  };

  const logout = () => {
    setAcces(false);
    navigate.push('/');
  }
  return (
    <div className="App">
      {ubicacion.pathname !== "/" ? <Nav onSearch={onSearch} logout={logout}/> : null}
        <Switch>
          <Route> path="/" <Welcome login={login}/> </Route>
          <Route> path="/home" <Countries countries={countries}/> </Route>
          <Route> path="/detail/:id" <Detail /> </Route>
          <Route> path="/touring" <TouringForm/> </Route>
        </Switch>
    </div>
  );
}

export default App;
