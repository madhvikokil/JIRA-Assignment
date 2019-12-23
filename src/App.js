import React from 'react';
import './App.css';
import {lazy,Suspense}from 'react';
import {Route,Switch} from 'react-router-dom';
import Logout from './component/logout';
import Chart from './component/chart';
const Login = lazy(() => import('./container/login'));
const Fetch = lazy(() => import('./container/fetch'));
const Fetch2 = lazy(() => import('./container/fetch2'));
const Projects = lazy(() => import('./component/projects'));

function App() {
  let routes =(
    <Switch>
      
      <Route path="/tablesheet" exact component={Projects} />
      <Route path="/tableSheet/table1" exact component={Fetch} />
      <Route path="/tableSheet/table2" component={Fetch2} />
      <Route path="/logout"  component={Logout} /> 
      <Route path="/chart" component={Chart} />
      <Route path="/" exact component={Login} />
  </Switch>
  )
  return (
    <div className="App">
     <Suspense fallback={<p>Loading...</p>}>
      {routes}
      </Suspense>
      </div>
  );
}

export default App;
