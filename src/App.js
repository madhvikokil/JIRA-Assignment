import React from 'react';
import './App.css';
import {lazy,Suspense}from 'react';
import {Route,Switch} from 'react-router-dom';
import SPAS from './container/table-two';
import Login from './container/login';
import Logout from './component/logout';
import Fetch from './component/fetch';
import Fetch2 from './component/fetch2';
//const RMOS = lazy(() => import('./container/table-one'));
import RMOS from './container/table-one';
import Projects from './component/projects';

// import FetchData from './component/practice';


function App() {
  let routes =(
    <Switch>
      <Route path="/tablesheet" exact component={Projects} />
      <Route path="/tableSheet/table1" exact component={Fetch} />
      <Route path="/tableSheet/table2" component={Fetch2} />
      <Route path="/logout"  component={Logout} /> 
      <Route path="/" exact component={Login} />
   {/* <Route path="/tableSheet" component={RMOS } />
   
    {/* <Route path="/tableSheet" component={SPAS} /> */}
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
