import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from './components/Login/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Public from './components/Public/Public';
import db ,  {auth} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';

function App() {
  const[{user} , dispatch] = useStateValue();
  
  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        dispatch({
          type: actionTypes.SET_USER,
          user: auth,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/searchPage">
            {user?.email ? <SignUp /> : <Login />}
          </Route>
          <Route path="/">
            {user?.email ? <Home /> : <Public />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
