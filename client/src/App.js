import './App.css';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/profile/Dashboard';
import Products from './components/products/Products';
import Item from './components/products/Item';
import Sell from './components/products/Sell';
function App() {
  return (
    <div className='app'>
      <div className='app__body'>
        <BrowserRouter>
          {/* navbar */}
          <Navbar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/sell' component={Sell} />
            <Route exact path='/product/:pid' component={Item} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
