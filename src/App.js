import React from 'react';
import './App.css';
import {lazy,Suspense}from 'react';
import {Route,Switch} from 'react-router-dom';
import SPAS from './container/table-two';
import Login from './container/login';
import Logout from './component/logout';
import Fetch from './component/fetch';
//const RMOS = lazy(() => import('./container/table-one'));
import RMOS from './container/table-one';

// import FetchData from './component/practice';


function App() {
  let routes =(
    <Switch>
      <Route path="/table" exact component={Fetch} />
     <Route path="/" exact component={Login} />
    <Route path="/tableSheet/table2" component={SPAS} />
   {/* <Route path="/tableSheet" component={RMOS } />
    <Route path="/logout"  component={Logout} /> */}
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
