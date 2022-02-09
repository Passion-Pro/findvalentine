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
import HomePreferedBy from './components/Home/HomePreferedBy';
import HomeChat from './components/Home/HomeChat';
import FindValentine from './components/FindValentine/FindValentine';

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

  useEffect(() => {
    if (user?.uid) {
      db.collection("boys")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_USERINFO,
            userInfo: snapshot.data(),
          })
        });
      db.collection("girls")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_USERINFO,
            userInfo: snapshot.data(),
          })
        });
    }
  }, [user?.uid]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signup">
            {<SignUp /> }
          </Route>
          <Route path="/signin">
            {<Login />}
          </Route>
          <Route path="/homepreferedBy">
            {user?.email ? <HomePreferedBy /> : <Login />}
          </Route>
          <Route path="/findvalentine">
            {user?.email ? <FindValentine /> : <Login />}
          </Route>
          <Route path="/public">
            {user?.email ? <Public /> : <Login />}
          </Route>
          <Route path="/chat">
            {user?.email ? <HomeChat /> : <Login />}
          </Route>
          <Route path="/">
            {user?.email ? <Home /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
