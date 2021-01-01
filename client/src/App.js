import './App.css';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
function App() {
  return (
    <div className='app'>
      <div className='app__body'>
        <BrowserRouter>
          {/* navbar */}
          <Navbar />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/dashboard' />
            <Route exact path='/products' />
            <Route exact path='/:pid' />
            <Route exact path='/sell' />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
