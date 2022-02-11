import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import SignUp from './components/Login/SignUp';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Public from './components/Public/Public';
import db, { auth } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import HomePreferedBy from './components/Home/HomePreferedBy';
import HomeChat from './components/Home/HomeChat';
import FindValentine from './components/FindValentine/FindValentine';
import UserProfile from './components/profilecard/UserProfile'
import ChatPage from './components/Home/ChatPage';
import Help from './components/Help/Help';
import ValentinePopUp from './components/profilecard/ValentinePopUp';

function App() {
  const [{ user, showPop, showPopIn }, dispatch] = useStateValue();
  const history = useHistory();

  console.log("first",showPop,showPopIn)

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
          if (snapshot.data()) {
            dispatch({
              type: actionTypes.SET_USERINFO,
              userInfo: snapshot.data(),
            })
          }
        })
      db.collection("girls")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          if (snapshot.data()) {
            dispatch({
              type: actionTypes.SET_USERINFO,
              userInfo: snapshot.data(),
            })
          }
        });
    }
  }, [user]);

  return (
    <div className="App" onClick={() => {
      if (showPopIn) {
        dispatch({
          type: actionTypes.SET_SHOW_POP,
          showPop: false,
        })
      }
    }}>
      <Router>
        <Switch>
          <Route path="/signup">
            {<SignUp />}
          </Route>
          <Route path="/signin">
            {<Login />}
          </Route>

          <Route path="/userProfile">
            {user?.email ? <UserProfile /> : <Login />}
          </Route>
          <Route path="/help">
            {user?.email ? <Help /> : <Login />}
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
          <Route path="/chat/:chatId">
            {user?.email ? <HomeChat /> : <Login />}
          </Route>
          <Route path="/chat">
            {user?.email ? <HomeChat /> : <Login />}
          </Route>
          <Route path="/chatMobile/:chatId">
            {user?.email ? <ChatPage /> : <Login />}
          </Route>
          <Route path="/profilePop/:popId">
            {user?.email ? <ValentinePopUp /> : <Login />}
          </Route>
          <Route path="/public">
            <Public />
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
