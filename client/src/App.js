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
  console.log('ubicacion.pathname',ubicacion.pathname);

  const onSearch = () =>{

  };

  const login = () =>{
    setAcces(true);
    navigate.push('/home');
  };

  const logout = () => {
    setAcces(false);
    navigate.push('/');
  };
  
  return (
    <div className="App">
      {ubicacion.pathname !== "/" ? <Nav onSearch={onSearch} logout={logout}/> : null}
      <Switch>
        <Route exact path="/"> <Welcome login={login}/> </Route>
        <Route exact path="/home"> <Countries countries={countries}/> </Route>
        <Route exact path="/detail/:id"> <Detail /> </Route>
        <Route exact path="/touring"> <TouringForm/> </Route>
      </Switch>
    </div>
  );
}

export default App;
