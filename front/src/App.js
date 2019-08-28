import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch 
} from 'react-router-dom';
import Routes from './routes';
import Inicio from './pages/inicio';
import Page404 from './pages/page404';
import Dashboard from './layout/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => ( <Dashboard children={Inicio} /> )}/>
        {
          Routes.map( (route, key ) => {
            return <Route 
                    key={key} 
                    exact 
                    path={route.path} 
                    component={() => ( <Dashboard children={route.component} /> )}
                    />    
          })
        }
        <Route component={Page404}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
