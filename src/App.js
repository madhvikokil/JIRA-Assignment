import React from 'react';
import './App.css'
import {lazy,Suspense}from 'react';
import {Route,Switch} from 'react-router-dom';
import Logout from './Auth/component/logout';
const Login = lazy(() => import('./Auth/container/login'));
const TableData1 = lazy(() => import('./Projects/container/tableOne'));
const TableData2 = lazy(() => import('./Projects/container/tableTwo'));
const Projects = lazy(() => import('./Projects/component/projects'));

function App() {
  let routes =(
    <Switch>
      
      <Route path="/tablesheet" exact component={Projects} />
      <Route path="/tableSheet/table1" exact component={TableData1} />
      <Route path="/tableSheet/table2" component={TableData2} />
      <Route path="/logout"  component={Logout} /> 
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
