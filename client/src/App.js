import './App.css';
import { Route, useLocation, Switch, useHistory } from 'react-router-dom';
import React, { useState } from 'react'
import Countries from './components/Countries/Countries.jsx';
import Detail from './components/Detail/Detail.jsx';
import Welcome from './components/Welcome/Welcome.jsx';
import Nav from './components/Nav/Nav.jsx';
import TouringForm from './components/TouringForm/TouringForm.jsx';

function App() {
  const [access,setAcces] = useState(false);

  let ubicacion = useLocation();
  let navigate = useHistory();


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
        {ubicacion.pathname !== "/" ? <Nav logout={logout}/> : null}
          <Switch>
            <Route exact path="/"> <Welcome login={login}/> </Route>
            <Route exact path="/home"> <Countries /> </Route>
            <Route exact path="/detail/:id"> <Detail /> </Route>
            <Route exact path="/touring"> <TouringForm/> </Route>
          </Switch>
        </div>
  );
};

export default App;
